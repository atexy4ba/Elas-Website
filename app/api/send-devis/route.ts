// /app/api/send-devis/route.ts

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Fonction pour formater les données du formulaire en HTML
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

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '100mb',
    },
  },
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Extraire les données du formulaire
    const data: any = {};
    for (const [key, value] of formData.entries()) {
      if (key !== 'file') {
        data[key] = value;
      }
    }

    // Récupérer le fichier s'il existe
    const file = formData.get('file') as File | null;

    // Configuration du transporteur Nodemailer
    let transporter;
    
    // En mode développement, utiliser Ethereal Email pour les tests
    if (process.env.NODE_ENV === 'development') {
      // Créer un compte de test Ethereal
      const testAccount = await nodemailer.createTestAccount();
      
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    } else {
      // Configuration de production
      transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        secure: true,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASS,
        },
      });
    }

    const mailOptions: any = {
      from: `"${data.fullName || 'Site Web ELAS'}" <${data.email || process.env.EMAIL_FROM}>`,
      to: process.env.NODE_ENV === 'development' ? 'test@example.com' : process.env.EMAIL_TO,
      subject: `Nouvelle demande de devis pour : ${data.projectType || 'Projet non spécifié'}`,
      html: formatDataAsHtml(data),
      replyTo: data.email || process.env.EMAIL_FROM, // Permet de répondre directement à la personne
    };

    // Ajouter le fichier comme pièce jointe s'il existe
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      mailOptions.attachments = [{
        filename: file.name,
        content: buffer,
        contentType: file.type
      }];
    }

    // Envoi de l'e-mail
    const info = await transporter.sendMail(mailOptions);

    // En mode développement, afficher l'URL de prévisualisation
    if (process.env.NODE_ENV === 'development') {
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

    return NextResponse.json({ 
      message: 'Demande envoyée avec succès',
      previewUrl: process.env.NODE_ENV === 'development' ? nodemailer.getTestMessageUrl(info) : null
    }, { status: 200 });
  } catch (error) {
    console.error('Erreur Nodemailer:', error);
    return NextResponse.json({ message: "Erreur lors de l'envoi de l'e-mail" }, { status: 500 });
  }
}
