import React from 'react';
import { utils, writeFile } from 'xlsx';

export const convertToXML = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('No data available for XML conversion');
  }

  const escapeXML = (str) => {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  const xmlItems = data.map(item => {
    const entries = Object.entries(item);
    return `  <item>\n${
      entries.map(([key, val]) => 
        `    <${key}>${
          typeof val === 'object' ? escapeXML(JSON.stringify(val)) : escapeXML(val)
        }</${key}>`
      ).join('\n')
    }\n  </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<root>\n${xmlItems}\n</root>`;
};

export const downloadFile = (content, fileName, mimeType) => {
  try {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  } catch (error) {
    console.error('Download failed:', error);
    throw new Error('Failed to create download');
  }
};

export const convertToCSV = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('No data available for CSV conversion');
  }
  
  const headers = Object.keys(data[0] || {});
  const csvRows = [
    headers.join(','),
    ...data.map(row => 
      headers.map(field => {
        const value = row[field];
        if (value === null || value === undefined) return '';
        if (typeof value === 'object') return JSON.stringify(value);
        return String(value).includes(',') ? `"${value}"` : value;
      }).join(',')
    )
  ];
  
  return csvRows.join('\n');
};

export const convertToXLSX = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('No data available for XLSX conversion');
  }

  // Convert array of objects to worksheet
  const worksheet = utils.json_to_sheet(data);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Sheet1");
  
  // Generate XLSX file and return as array buffer
  return writeFile(workbook, { bookType: 'xlsx', type: 'array' });
};