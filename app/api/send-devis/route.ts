// /app/api/send-devis/route.ts

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Fonction pour formater les données du formulaire en HTML
function formatDataAsHtml(data: any): string {
    let html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2 style="color: #0d47a1;">Nouvelle demande de devis - Réf: ELAS-${Date.now()}</h2>
            <p>Une nouvelle demande a été soumise depuis le site web.</p>
            <hr>
            <h3>Détails du Contact</h3>
            <ul>
                <li><strong>Nom:</strong> ${data.fullName || 'Non spécifié'}</li>
                <li><strong>Email:</strong> ${data.email || 'Non spécifié'}</li>
                <li><strong>Téléphone:</strong> ${data.phone || 'Non spécifié'}</li>
                <li><strong>Profil:</strong> ${data.contactType || 'Non spécifié'}</li>
                <li><strong>Wilaya:</strong> ${data.wilaya || 'Non spécifiée'}</li>
            </ul>
            <hr>
            <h3>Détails du Projet</h3>
            <ul>
                <li><strong>Type de Projet:</strong> ${data.projectType || 'Non spécifié'}</li>
    `;

    if(data.buildingType) html += `<li><strong>Type de Bâtiment:</strong> ${data.buildingType}</li>`;
    if(data.projectNature) html += `<li><strong>Nature du Projet:</strong> ${data.projectNature}</li>`;
    if(data.floorCount) html += `<li><strong>Nombre d'étages:</strong> ${data.floorCount}</li>`;
    if(data.maxLoad) html += `<li><strong>Charge Maximale (kg):</strong> ${data.maxLoad}</li>`;

    html += `
            </ul>
            <hr>
            <h3>Informations Complémentaires</h3>
            <p style="white-space: pre-wrap; background-color: #f4f4f4; padding: 10px; border-radius: 5px;">${data.additionalInfo || 'Aucune'}</p>
        </div>
    `;
    return html;
}

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
      from: `"Site Web ELAS" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      subject: `Nouvelle demande de devis pour : ${data.projectType || 'Projet non spécifié'}`,
      html: formatDataAsHtml(data),
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
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Demande envoyée avec succès' }, { status: 200 });
  } catch (error) {
    console.error('Erreur Nodemailer:', error);
    return NextResponse.json({ message: "Erreur lors de l'envoi de l'e-mail" }, { status: 500 });
  }
}
