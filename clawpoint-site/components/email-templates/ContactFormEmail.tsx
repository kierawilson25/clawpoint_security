import * as React from 'react';

interface ContactFormEmailProps {
  name: string;
  email: string;
  company: string;
  phone?: string;
  interests: string[];
  message: string;
}

export function ContactFormEmail({
  name,
  email,
  company,
  phone,
  interests,
  message,
}: ContactFormEmailProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ backgroundColor: '#000000', color: '#00ff41', padding: '20px', borderBottom: '2px solid #00ff41' }}>
        <h1 style={{ margin: 0, fontFamily: 'monospace', fontSize: '24px' }}>
          🎯 NEW CONTACT FORM SUBMISSION
        </h1>
      </div>

      <div style={{ backgroundColor: '#ffffff', padding: '30px', color: '#000000' }}>
        <h2 style={{ color: '#0a4d0a', borderBottom: '2px solid #0a4d0a', paddingBottom: '10px' }}>
          Contact Information
        </h2>

        <table style={{ width: '100%', marginBottom: '20px' }}>
          <tbody>
            <tr>
              <td style={{ fontWeight: 'bold', padding: '8px 0', width: '120px' }}>Name:</td>
              <td style={{ padding: '8px 0' }}>{name}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold', padding: '8px 0' }}>Email:</td>
              <td style={{ padding: '8px 0' }}>
                <a href={`mailto:${email}`} style={{ color: '#0a4d0a' }}>{email}</a>
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold', padding: '8px 0' }}>Company:</td>
              <td style={{ padding: '8px 0' }}>{company}</td>
            </tr>
            {phone && (
              <tr>
                <td style={{ fontWeight: 'bold', padding: '8px 0' }}>Phone:</td>
                <td style={{ padding: '8px 0' }}>
                  <a href={`tel:${phone}`} style={{ color: '#0a4d0a' }}>{phone}</a>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {interests.length > 0 && (
          <>
            <h2 style={{ color: '#0a4d0a', borderBottom: '2px solid #0a4d0a', paddingBottom: '10px' }}>
              Areas of Interest
            </h2>
            <ul style={{ listStyleType: 'none', padding: 0, marginBottom: '20px' }}>
              {interests.map((interest, index) => (
                <li key={index} style={{ padding: '5px 0' }}>
                  ✓ {interest}
                </li>
              ))}
            </ul>
          </>
        )}

        <h2 style={{ color: '#0a4d0a', borderBottom: '2px solid #0a4d0a', paddingBottom: '10px' }}>
          Message
        </h2>
        <div style={{
          backgroundColor: '#f5f5f5',
          padding: '15px',
          borderLeft: '4px solid #0a4d0a',
          marginBottom: '20px',
          whiteSpace: 'pre-wrap'
        }}>
          {message}
        </div>
      </div>

      <div style={{ backgroundColor: '#0a4d0a', color: '#ffffff', padding: '15px', textAlign: 'center', fontSize: '12px' }}>
        <p style={{ margin: 0 }}>
          Clawpoint Security Collective | Hunting threats in the digital forest
        </p>
      </div>
    </div>
  );
}
