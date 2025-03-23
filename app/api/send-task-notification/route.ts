// app/api/send-task-notification/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import PocketBase from 'pocketbase';

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',  // You can use other services like 'sendgrid', 'mailgun', etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
    // If using OAuth2 with Gmail:
    // type: 'OAuth2',
    // clientId: process.env.GMAIL_CLIENT_ID,
    // clientSecret: process.env.GMAIL_CLIENT_SECRET,
    // refreshToken: process.env.GMAIL_REFRESH_TOKEN
  },
});

const getPriorityStyle = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'color: #ef4444; font-weight: bold;';
    case 'medium':
      return 'color: #f59e0b; font-weight: bold;';
    case 'low':
      return 'color: #22c55e; font-weight: bold;';
    default:
      return '';
  }
};

const getCategoryDisplay = (category: string) => {
  const categories: Record<string, string> = {
    'core': 'Core Subjects',
    'hackathons': 'Hackathons',
    'ctfs': 'CTFs',
    'projects': 'NPTEL',
    'exams': 'Exams'
  };
  
  return categories[category] || category;
};

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Received task data:', data);
    const { 
      task_id, 
      task_title, 
      task_description, 
      task_due_date, 
      task_category, 
      task_priority, 
      recipients 
    } = data;

    if (!recipients || recipients.length === 0) {
      return NextResponse.json({ error: 'No recipients provided' }, { status: 400 });
    }

    // Format the due date
    const dueDate = new Date(task_due_date);
    const formattedDate = dueDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Create email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 5px;">
        <h2 style="color: #3b82f6; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">New Task Added</h2>
        
        <div style="margin: 20px 0;">
          <h3 style="margin-bottom: 5px;">${task_title}</h3>
          <p style="color: #64748b; margin-top: 0;">${task_description || 'No description provided'}</p>
        </div>
        
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
          <p><strong>Due Date:</strong> ${formattedDate}</p>
          <p><strong>Category:</strong> ${getCategoryDisplay(task_category)}</p>
          <p><strong>Priority:</strong> <span style="${getPriorityStyle(task_priority)}">${task_priority.toUpperCase()}</span></p>
        </div>
        
        <div style="font-size: 0.875rem; color: #64748b; margin-top: 30px; text-align: center; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <p>This is an automated notification from your Task Tracker application.</p>
          <p>To manage your notification preferences, please visit the application settings.</p>
        </div>
      </div>
    `;

    // Send email to all recipients
    const mailOptions = {
      from: `"Task Tracker" <${process.env.EMAIL_USER}>`,
      bcc: recipients,  // Using BCC so recipients don't see each other's emails
      subject: `New Task: ${task_title}`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Notifications sent successfully' });
  } catch (error) {
    console.error('Error sending notification emails:', error);
    return NextResponse.json(
      { error: 'Failed to send notification emails', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}