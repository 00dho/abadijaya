import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // <--- 1. UBAH CARA IMPORT

export const generateWarrantyPDF = (data) => {
  // Inisialisasi Dokumen PDF
  const doc = new jsPDF();

  // --- HEADER ---
  doc.setFillColor(37, 99, 235);
  doc.rect(0, 0, 210, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("ABADI JAYA FILM", 105, 20, { align: "center" });
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Kartu Garansi Resmi & Bukti Pemasangan", 105, 28, { align: "center" });

  // --- INFO PELANGGAN ---
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  
  const startY = 50;
  const info = data.data[0]; 

  doc.text(`Pemilik       : ${data.pemilik}`, 14, startY);
  doc.text(`Nomor HP   : ${info.no_hp}`, 14, startY + 6);
  doc.text(`Alamat       : ${info.alamat || '-'}`, 14, startY + 12);
  doc.text(`Dicetak Pada: ${new Date().toLocaleDateString('id-ID')}`, 140, startY);

  doc.setLineWidth(0.5);
  doc.line(14, startY + 18, 196, startY + 18);

  // --- LOOPING DATA KENDARAAN (TABEL) ---
  let finalY = startY + 25;

  data.data.forEach((item, index) => {
    // Judul Mobil
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(37, 99, 235);
    doc.text(`Kendaraan #${index + 1}: ${item.tipe_mobil} (${item.plat_nomor})`, 14, finalY);
    
    // Data Tabel
    const tableData = [
      ["Posisi Kaca", "Jenis Film"],
      ["Kaca Depan", item.film_depan],
      ["Kaca Samping", item.film_samping],
      ["Kaca Belakang", item.film_belakang],
    ];

    // --- 2. UBAH CARA PANGGIL TABEL DI SINI ---
    // Jangan pakai doc.autoTable, tapi pakai autoTable(doc, ...)
    autoTable(doc, {
      startY: finalY + 5,
      head: [tableData[0]],
      body: tableData.slice(1),
      theme: 'grid',
      headStyles: { fillColor: [37, 99, 235] },
      styles: { fontSize: 10, cellPadding: 3 },
      columnStyles: { 0: { fontStyle: 'bold', width: 50 } },
    });

    // Update posisi Y setelah tabel digambar
    finalY = doc.lastAutoTable.finalY + 10;
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    
    doc.text(`Tanggal Pasang  : ${new Date(item.tgl_pasang).toLocaleDateString('id-ID', { dateStyle: 'long' })}`, 14, finalY);
    doc.text(`Garansi Hingga   : ${new Date(item.masa_berlaku).toLocaleDateString('id-ID', { dateStyle: 'long' })}`, 14, finalY + 6);
    
    // Kotak Keterangan
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(14, finalY + 12, 182, 15, 2, 2, 'F');
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    doc.text(`Catatan: ${item.keterangan || "Tidak ada catatan khusus."}`, 17, finalY + 22);

    finalY += 40; 
  });

  // --- FOOTER ---
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("Dokumen ini adalah bukti garansi digital yang sah dari Abadi Jaya Film.", 105, pageHeight - 20, { align: "center" });
  doc.text("Harap simpan dokumen ini untuk keperluan klaim garansi.", 105, pageHeight - 15, { align: "center" });

  // Simpan File
  doc.save(`Garansi_${data.pemilik.replace(/\s+/g, '_')}.pdf`);
};