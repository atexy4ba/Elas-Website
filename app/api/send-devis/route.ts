// /app/api/send-devis/route.ts

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

// --- La fonction formatDataAsHtml reste identique ---
function formatDataAsHtml(data: any): string {
    const reference = `ELAS-${Date.now()}`;
    const senderName = data.fullName || 'Client non identifié';
    const senderEmail = data.email || 'Email non fourni';
    
    let html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #0d47a1, #1976d2); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
                <h2 style="margin: 0; text-align: center;">Nouvelle demande de devis</h2>
                <p style="margin: 10px 0 0 0; text-align: center; opacity: 0.9;">Référence: ${reference}</p>
            </div>
            
            <div style="padding: 20px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                    <h3 style="color: #0d47a1; margin: 0 0 10px 0;">📧 Expéditeur</h3>
                    <p style="margin: 5px 0;"><strong>Nom:</strong> ${senderName}</p>
                    <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${senderEmail}" style="color: #1976d2;">${senderEmail}</a></p>
                    <p style="margin: 5px 0;"><strong>Téléphone:</strong> ${data.phone || 'Non spécifié'}</p>
                    <p style="margin: 5px 0;"><strong>Profil:</strong> ${data.contactType || 'Non spécifié'}</p>
                    <p style="margin: 5px 0;"><strong>Wilaya:</strong> ${data.wilaya || 'Non spécifiée'}</p>
                </div>
                
                <div style="background-color: #e3f2fd; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                    <h3 style="color: #0d47a1; margin: 0 0 10px 0;">🏗️ Détails du Projet</h3>
                    <p style="margin: 5px 0;"><strong>Type de Projet:</strong> ${data.projectType || 'Non spécifié'}</p>
    `;

    if(data.buildingType) html += `<p style="margin: 5px 0;"><strong>Type de Bâtiment:</strong> ${data.buildingType}</p>`;
    if(data.projectNature) html += `<p style="margin: 5px 0;"><strong>Nature du Projet:</strong> ${data.projectNature}</p>`;
    if(data.floorCount) html += `<p style="margin: 5px 0;"><strong>Nombre d'étages:</strong> ${data.floorCount}</p>`;
    if(data.maxLoad) html += `<p style="margin: 5px 0;"><strong>Charge Maximale (kg):</strong> ${data.maxLoad}</p>`;

    html += `
                </div>
                
                <div style="background-color: #fff3e0; padding: 15px; border-radius: 5px;">
                    <h3 style="color: #0d47a1; margin: 0 0 10px 0;">📝 Informations Complémentaires</h3>
                    <p style="white-space: pre-wrap; margin: 0; background-color: white; padding: 10px; border-radius: 5px; border-left: 4px solid #ff9800;">${data.additionalInfo || 'Aucune information supplémentaire fournie.'}</p>
                </div>
                
                <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #e0e0e0; text-align: center; color: #666; font-size: 12px;">
                    <p>Cette demande a été envoyée depuis le site web ELAS le ${new Date().toLocaleDateString('fr-FR', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}</p>
                    <p>Pour répondre directement à ${senderName}, cliquez sur "Répondre" dans votre client email.</p>
                </div>
            </div>
        </div>
    `;
    return html;
}


// --- NOUVELLE VERSION DE LA FONCTION appendToSheet ---

async function appendToSheet(data: any) {
    // 1. Définition des en-têtes des colonnes
    const HEADERS = [[
        'Date de soumission', 'Référence', 'Nom Complet', 'Email', 'Téléphone', 
        'Wilaya', 'Profil Client', 'Type de Projet', 'Type de Bâtiment', 
        'Nature du Projet', 'Nombre d\'étages', 'Charge Maximale (kg)', 'Informations Complémentaires'
    ]];
    const SHEET_NAME = 'Devis'; // Assurez-vous que ce nom correspond à votre onglet

    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });
        const spreadsheetId = process.env.GOOGLE_SHEET_ID;

        // 2. Vérifier si la feuille est vide pour ajouter les en-têtes
        const getRows = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${SHEET_NAME}!A1:A1`,
        });

        if (!getRows.data.values || getRows.data.values.length === 0) {
            // La feuille est vide, on écrit les en-têtes
            await sheets.spreadsheets.values.update({
                spreadsheetId,
                range: `${SHEET_NAME}!A1`,
                valueInputOption: 'USER_ENTERED',
                requestBody: {
                    values: HEADERS,
                },
            });
        }

        // 3. Préparer et ajouter la nouvelle ligne de données
        const newRow = [[
            new Date().toISOString(),
            `ELAS-${Date.now()}`,
            data.fullName || '',
            data.email || '',
            data.phone || '',
            data.wilaya || '',
            data.contactType || '',
            data.projectType || '',
            data.buildingType || '',
            data.projectNature || '',
            data.floorCount || '',
            data.maxLoad || '',
            data.additionalInfo || '',
        ]];

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: `${SHEET_NAME}!A1`,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: newRow,
            },
        });

    } catch (error) {
        console.error('Google Sheets API Error:', error);
    }
}


// --- Le handler POST reste identique ---

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const data: any = {};
    for (const [key, value] of formData.entries()) {
      if (key !== 'file') {
        data[key] = value;
      }
    }

    const file = formData.get('file') as File | null;

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        secure: true,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASS,
        },
    });

    const mailOptions: any = {
      from: `"${data.fullName || 'Site Web ELAS'}" <${process.env.EMAIL_SERVER_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `Nouvelle demande de devis pour : ${data.projectType || 'Projet non spécifié'}`,
      html: formatDataAsHtml(data),
      replyTo: data.email || process.env.EMAIL_SERVER_USER,
    };

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      mailOptions.attachments = [{
        filename: file.name,
        content: buffer,
        contentType: file.type
      }];
    }
    
    await transporter.sendMail(mailOptions);
    
    await appendToSheet(data);

    return NextResponse.json({ 
      message: 'Demande envoyée avec succès',
    }, { status: 200 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: "Erreur lors du traitement de la demande" }, { status: 500 });
  }
}