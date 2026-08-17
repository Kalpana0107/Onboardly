/**
 * emailService.js — Resend email integration.
 * Sends onboarding completion reports to HR.
 */
const { Resend } = require('resend');

const apiKey = process.env.RESEND_API_KEY;
// Initialize Resend
const resend = apiKey ? new Resend(apiKey) : null;

/**
 * Sends a structured completion email report to the HR administrator.
 */
const sendCompletionEmail = async ({ employeeName, employeeEmail, role, completedTasks }) => {
  try {
    if (!resend) {
      console.warn('Resend API key is not configured. Email will be logged to console instead.');
      console.log('--- EMAIL SIMULATION ---');
      console.log(`To: HR Admin`);
      console.log(`Subject: Onboarding Completed: ${employeeName}`);
      console.log(`Body: Employee ${employeeName} (${employeeEmail}) holding role ${role} has finished all ${completedTasks.length} tasks.`);
      console.log('------------------------');
      return { success: true, simulated: true };
    }

    const htmlContent = `
      <h1>Onboarding Completed! 🎉</h1>
      <p>Dear HR Team,</p>
      <p>The following candidate has successfully completed 100% of their onboarding checklist:</p>
      <ul>
        <li><strong>Name:</strong> ${employeeName}</li>
        <li><strong>Email:</strong> ${employeeEmail}</li>
        <li><strong>Role:</strong> ${role}</li>
        <li><strong>Completion Time:</strong> ${new Date().toLocaleString()}</li>
      </ul>
      <h3>Completed Onboarding Tasks Checklist:</h3>
      <ol>
        ${completedTasks.map(t => `<li>✅ ${t.title} (Finished: ${t.completedAt ? new Date(t.completedAt).toLocaleString() : 'N/A'})</li>`).join('')}
      </ol>
      <p>Best regards,<br/>SmartHire Automated Agent</p>
    `;

    const data = await resend.emails.send({
      from: 'SmartHire Onboarding <onboarding@resend.dev>',
      to: process.env.HR_EMAIL || 'hr@company.com',
      subject: `🎉 Onboarding Completion Report: ${employeeName}`,
      html: htmlContent
    });

    return { success: true, data };
  } catch (err) {
    console.error('Failed to send completion email:', err);
    // Do not crash the application if email transmission fails
    return { success: false, error: err.message };
  }
};

module.exports = { sendCompletionEmail };
