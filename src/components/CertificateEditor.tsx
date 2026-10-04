import React, { useState, useRef } from 'react';
import { Printer, Download, Share2, Check, RefreshCw, Edit3, Award, Sparkles, Copy, FileText, ArrowLeft, Image as ImageIcon, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';

const generatedCertImage = '/assets/images/certificado_tec_final_corregido_1785469547711.jpg';

interface CertificateEditorProps {
  onBack?: () => void;
}

export default function CertificateEditor({ onBack }: CertificateEditorProps) {
  // Exact defaults requested by the user:
  const [institutionHeader, setInstitutionHeader] = useState('Escuela de Administración de Empresas');
  const [institutionSubHeader, setInstitutionSubHeader] = useState('Instituto Tecnológico');
  const [certificateType, setCertificateType] = useState('Certificado de Finalización');
  const [studentName, setStudentName] = useState('NOMBRE DEL GRADUADO');
  const [idNumber, setIdNumber] = useState('102340567');
  const [programName, setProgramName] = useState('Carrera de Administración de Empresas con Énfasis en Banca y Finanzas');
  const [duration, setDuration] = useState('4 años');
  const [issueDate, setIssueDate] = useState('17 de junio del año 2004');
  
  const [leftSignatureTitle, setLeftSignatureTitle] = useState('Coordinadora de Carrera');
  const [leftSignatureName, setLeftSignatureName] = useState('Mª del Milagro González C.');
  
  const [rightSignatureTitle, setRightSignatureTitle] = useState('Profesor del Curso');
  const [rightSignatureName, setRightSignatureName] = useState('Juan Carlos Sanabria');

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCertText, setCopiedCertText] = useState(false);
  const [copiedCertImageCard, setCopiedCertImageCard] = useState(false);
  const [isCapturingCertCard, setIsCapturingCertCard] = useState(false);
  const [certImageRealUrl, setCertImageRealUrl] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState<'interactive' | 'ai-image'>('ai-image');
  
  const certRef = useRef<HTMLDivElement>(null);

  const handleCopyCertImageCard = async () => {
    const element = document.getElementById('printable-certificate-area');
    if (!element) {
      alert("No se encontró el título interactivo.");
      return;
    }
    try {
      setIsCapturingCertCard(true);
      await new Promise(r => setTimeout(r, 200));

      const canvas = await html2canvas(element, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#fdfbf7',
        scale: 2.2,
      });

      canvas.toBlob(async (blob) => {
        if (!blob) {
          alert("No se pudo generar la imagen del título.");
          setIsCapturingCertCard(false);
          return;
        }
        const imgData = canvas.toDataURL('image/png');
        setCertImageRealUrl(imgData);

        try {
          await navigator.clipboard.write([
            new ClipboardItem({ [blob.type]: blob })
          ]);
          setCopiedCertImageCard(true);
          setTimeout(() => setCopiedCertImageCard(false), 3500);
          alert("✅ ¡CUADRO COMPLETO COPIADO AL PORTAPAPELES Y CONVERTIDO EN IMAGEN REAL!\n\nAhora puedes ir a WhatsApp, Word, correo o chat y presionar Pegar (Ctrl + V). También se habilitó la imagen abajo sobre la cual puedes hacer Clic Derecho -> 'Guardar imagen como...'.");
        } catch (err) {
          console.warn("Direct image clipboard write blocked:", err);
          const link = document.createElement('a');
          link.download = `Certificado_TEC_${studentName.replace(/\s+/g, '_')}_Cuadro_Completo.png`;
          link.href = imgData;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          navigator.clipboard.writeText(getFormattedCertText());
          setCopiedCertImageCard(true);
          setTimeout(() => setCopiedCertImageCard(false), 3500);

          alert("✅ ¡IMAGEN DEL CUADRO GENERADA Y DESCARGADA EN TU DISPOSITIVO!\n\nTambién se ha copiado el texto formateado al portapapeles. Puedes adjuntar la imagen en WhatsApp, correo o Word.");
        } finally {
          setIsCapturingCertCard(false);
        }
      });
    } catch (error) {
      console.error("Error al capturar el cuadro:", error);
      setIsCapturingCertCard(false);
    }
  };

  const getFormattedCertText = () => {
    return `===========================================================
INSTITUTO TECNOLÓGICO DE COSTA RICA (TEC)
ESCUELA DE ADMINISTRACIÓN DE EMPRESAS
===========================================================
CERTIFICADO OFICIAL DE FINALIZACIÓN Y GRADUACIÓN

Por cuanto la estudiante:
${studentName}
Cédula de Identidad N°: ${idNumber}

Ha completado satisfactoriamente el plan de estudios correspondiente con una duración de ${duration} en la ${programName}.

Se le otorga el título/certificado de:
${certificateType}

Fecha de emisión oficial: ${issueDate}.

AUTORIDADES Y FIRMAS OFICIALES REGISTRADAS:
- ${leftSignatureTitle}: ${leftSignatureName}
- ${rightSignatureTitle}: ${rightSignatureName}
===========================================================
REGISTRO Y VALIDACIÓN OFICIAL TEC: TEC-EAE-2004-${idNumber}
===========================================================`;
  };

  const handleCopyCertText = () => {
    navigator.clipboard.writeText(getFormattedCertText());
    setCopiedCertText(true);
    setTimeout(() => setCopiedCertText(false), 3000);
  };

  // Reset to user's exact requested values
  const handleResetToUserRequest = () => {
    setInstitutionHeader('Escuela de Administración de Empresas');
    setInstitutionSubHeader('Instituto Tecnológico');
    setCertificateType('Certificado de Finalización');
    setStudentName('NOMBRE DEL GRADUADO');
    setIdNumber('102340567');
    setProgramName('Carrera de Administración de Empresas con Énfasis en Banca y Finanzas');
    setDuration('4 años');
    setIssueDate('17 de junio del año 2004');
    setLeftSignatureTitle('Coordinadora de Carrera');
    setLeftSignatureName('Mª del Milagro González C.');
    setRightSignatureTitle('Profesor del Curso');
    setRightSignatureName('Juan Carlos Sanabria');
  };

  // Copy shareable link
  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('project', 'certificate');
      navigator.clipboard.writeText(url.toString());
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  // Trigger high-res browser print / save as PDF
  const handlePrint = () => {
    window.print();
  };

  // Render to Canvas for crisp 300DPI PNG download
  const handleDownloadPNG = () => {
    setIsDownloading(true);
    try {
      const canvas = document.createElement('canvas');
      const width = 2400; // High Resolution width for print quality
      const height = 1600;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      // Background
      ctx.fillStyle = '#fdfbf7'; // Crisp parchment paper background
      ctx.fillRect(0, 0, width, height);

      // Outer Thick Gold Frame
      ctx.strokeStyle = '#b8860b'; // Metallic Gold
      ctx.lineWidth = 20;
      ctx.strokeRect(20, 20, width - 40, height - 40);

      // Inner Navy Frame
      ctx.strokeStyle = '#0d233a'; // Royal Dark Navy
      ctx.lineWidth = 6;
      ctx.strokeRect(38, 38, width - 76, height - 76);

      // Thin Inner Gold Accent
      ctx.strokeStyle = '#d4af37'; // Light Gold
      ctx.lineWidth = 2;
      ctx.strokeRect(50, 50, width - 100, height - 100);

      // Top Royal Blue Header Banner
      const headerGradient = ctx.createLinearGradient(60, 0, width - 60, 0);
      headerGradient.addColorStop(0, '#0d233a');
      headerGradient.addColorStop(0.5, '#1e3a8a');
      headerGradient.addColorStop(1, '#0d233a');
      ctx.fillStyle = headerGradient;
      ctx.fillRect(60, 60, width - 120, 240);

      // Header Bottom Gold Trim
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(60, 300);
      ctx.lineTo(width - 60, 300);
      ctx.stroke();

      // Top Left TEC Logo representation / text
      ctx.fillStyle = '#fcf6ba';
      ctx.font = 'bold 52px sans-serif';
      ctx.fillText('TEC', 130, 160);
      ctx.font = 'bold 22px sans-serif';
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText('Instituto Tecnológico de Costa Rica', 130, 200);

      // Top Right Institution Header Text
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 44px serif';
      ctx.fillText(institutionHeader, width - 130, 160);
      ctx.font = 'italic 28px serif';
      ctx.fillStyle = '#fef08a';
      ctx.fillText(institutionSubHeader, width - 130, 210);

      // Reset align
      ctx.textAlign = 'center';

      // Certificate Title (Large text)
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 90px serif';
      ctx.fillText(certificateType, width / 2, 470);

      // Recipient Prefix
      ctx.textAlign = 'left';
      ctx.font = '38px serif';
      ctx.fillStyle = '#334155';
      ctx.fillText('A:', 180, 590);

      // Recipient Name (Bold centered/underlined feel)
      ctx.textAlign = 'center';
      ctx.font = 'bold 68px sans-serif';
      ctx.fillStyle = '#0f172a';
      ctx.fillText(studentName, width / 2, 670);

      // Underline for name
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(250, 700);
      ctx.lineTo(width - 250, 700);
      ctx.stroke();

      // Course Prefix
      ctx.textAlign = 'left';
      ctx.font = '38px serif';
      ctx.fillStyle = '#334155';
      ctx.fillText('en la:', 180, 780);

      // Program Name
      ctx.textAlign = 'center';
      ctx.font = 'italic bold 54px serif';
      ctx.fillStyle = '#1e293b';
      ctx.fillText(programName, width / 2, 860);

      // Underline for program
      ctx.beginPath();
      ctx.moveTo(250, 890);
      ctx.lineTo(width - 250, 890);
      ctx.stroke();

      // Duration & Date row
      ctx.textAlign = 'left';
      ctx.font = '38px serif';
      ctx.fillStyle = '#334155';
      ctx.fillText('Duración:', 180, 1020);
      
      ctx.font = 'bold 44px sans-serif';
      ctx.fillStyle = '#0f172a';
      ctx.fillText(duration, 380, 1020);

      ctx.font = '38px serif';
      ctx.fillStyle = '#334155';
      ctx.fillText('Fecha de emisión:', 1000, 1020);

      ctx.font = 'bold 42px sans-serif';
      ctx.fillStyle = '#0f172a';
      ctx.fillText(issueDate, 1380, 1020);

      // Bottom lines for signatures
      ctx.beginPath();
      ctx.moveTo(180, 1350);
      ctx.lineTo(800, 1350);
      ctx.moveTo(width - 800, 1350);
      ctx.lineTo(width - 180, 1350);
      ctx.stroke();

      // Signatures text
      ctx.font = 'italic 46px cursive';
      ctx.fillStyle = '#1e3a8a'; // Blue ink style
      ctx.fillText(leftSignatureName, 320, 1320);
      ctx.fillText(rightSignatureName, width - 650, 1320);

      ctx.textAlign = 'center';
      ctx.font = 'bold 28px sans-serif';
      ctx.fillStyle = '#475569';
      ctx.fillText(leftSignatureTitle.toUpperCase(), 490, 1400);
      ctx.fillText(rightSignatureTitle.toUpperCase(), width - 490, 1400);

      // Circular Stamp representation (bottom right)
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(width - 320, 1180, 110, 0, Math.PI * 2);
      ctx.stroke();

      ctx.font = '16px sans-serif';
      ctx.fillStyle = '#0369a1';
      ctx.fillText('ESCUELA ADM. EMPRESAS', width - 320, 1160);
      ctx.fillText('INSTITUTO TECNOLÓGICO', width - 320, 1185);
      ctx.fillText('DE COSTA RICA', width - 320, 1210);

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (!blob) return;
        const link = document.createElement('a');
        link.download = `Certificado_${studentName.replace(/\s+/g, '_')}.png`;
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
        setIsDownloading(false);
      }, 'image/png');

    } catch (e) {
      console.error(e);
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 font-sans pb-16 selection:bg-amber-500 selection:text-stone-950">
      
      {/* CSS Styles specialized for print mode */}
      <style>{`
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          body * {
            visibility: hidden !important;
          }
          #printable-certificate-area, #printable-certificate-area * {
            visibility: visible !important;
          }
          #printable-certificate-area {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            height: 100% !important;
            margin: 0 !important;
            padding: 2.5rem !important;
            background-color: #fdfbf7 !important;
            box-shadow: none !important;
            border: 14px double #b8860b !important;
            box-sizing: border-box !important;
            page-break-inside: avoid !important;
            page-break-after: avoid !important;
            z-index: 9999999 !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* TOP BAR / NAVIGATION */}
      <header className="no-print sticky top-0 z-40 bg-stone-950/95 backdrop-blur-md border-b border-stone-800 px-4 py-3 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg transition"
                title="Volver"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-500/40 text-amber-400 font-mono text-[10px] font-bold rounded uppercase">
                  Título Universitario / TEC
                </span>
                <h1 className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span>Editor de Título Digital TEC</span>
                </h1>
              </div>
              <p className="text-xs text-stone-400">
                Certificado oficial ajustado con Escuela de Administración de Empresas, 4 años y fecha año 2000.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleResetToUserRequest}
              className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
              title="Restablecer valores exactos solicitados"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              <span>Restablecer Datos Solicitados</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-cyan-300 border border-cyan-500/30 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{copiedLink ? '¡Enlace Copiado!' : 'Copiar Enlace Directo'}</span>
            </button>

            <button
              onClick={handleDownloadPNG}
              disabled={isDownloading}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-lg text-xs font-extrabold transition flex items-center gap-1.5 shadow-md shadow-amber-950/40 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isDownloading ? 'Generando PNG...' : 'Descargar Imagen (PNG)'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-emerald-950/40 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* EDIT CONTROLS SIDEBAR (no-print) */}
        <div className="no-print lg:col-span-4 bg-stone-950/80 border border-stone-800 rounded-2xl p-5 shadow-2xl space-y-5 h-fit">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <h2 className="text-sm font-bold text-stone-200 flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-amber-400" />
              <span>Modificar Campos del Título</span>
            </h2>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono font-bold">
              100% Personalizable
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Header Title */}
            <div>
              <label className="block text-stone-400 mb-1 font-semibold">1. Escuela / Vicerrectoría (Encabezado Superior):</label>
              <input
                type="text"
                value={institutionHeader}
                onChange={(e) => setInstitutionHeader(e.target.value)}
                className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500 font-semibold"
                placeholder="Escuela de Administración de Empresas"
              />
            </div>

            {/* Subheader */}
            <div>
              <label className="block text-stone-400 mb-1 font-semibold">Sub-encabezado / Universidad:</label>
              <input
                type="text"
                value={institutionSubHeader}
                onChange={(e) => setInstitutionSubHeader(e.target.value)}
                className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
                placeholder="Instituto Tecnológico de Costa Rica"
              />
            </div>

            {/* Certificate Type */}
            <div>
              <label className="block text-stone-400 mb-1 font-semibold">2. Título Principal (Letras Grandes):</label>
              <input
                type="text"
                value={certificateType}
                onChange={(e) => setCertificateType(e.target.value)}
                className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-amber-300 font-bold focus:outline-none focus:border-amber-500 text-sm"
                placeholder="Certificado de Finalización"
              />
            </div>

            {/* Student Name */}
            <div>
              <label className="block text-stone-400 mb-1 font-semibold">3. Nombre del Graduado / Estudiante (A:):</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-amber-400 font-black focus:outline-none focus:border-amber-500 text-sm"
                placeholder="NOMBRE Y APELLIDOS DEL GRADUADO"
              />
            </div>

            {/* Student ID / Cédula */}
            <div>
              <label className="block text-stone-400 mb-1 font-semibold">Cédula / Identificación:</label>
              <input
                type="text"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 font-semibold focus:outline-none focus:border-amber-500"
                placeholder="6240554"
              />
            </div>

            {/* Program Name */}
            <div>
              <label className="block text-stone-400 mb-1 font-semibold">4. Nombre de la Carrera / Curso:</label>
              <textarea
                rows={2}
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
                className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 font-semibold focus:outline-none focus:border-amber-500"
                placeholder="Carrera de Administración de Empresas con Énfasis en Banca y Finanzas"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-stone-400 mb-1 font-semibold">5. Duración del Programa:</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
                placeholder="4 años"
              />
            </div>

            {/* Issue Date */}
            <div>
              <label className="block text-stone-400 mb-1 font-semibold">6. Fecha de Emisión / Expedición:</label>
              <input
                type="text"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
                placeholder="17 de junio del año 2000"
              />
            </div>

            {/* Left Signature Title */}
            <div>
              <label className="block text-stone-400 mb-1 font-semibold">7. Cargo Firma Izquierda:</label>
              <input
                type="text"
                value={leftSignatureTitle}
                onChange={(e) => setLeftSignatureTitle(e.target.value)}
                className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
                placeholder="Coordinador de Carrera"
              />
            </div>

            {/* Left Signature Name */}
            <div>
              <label className="block text-stone-400 mb-1 font-semibold">Nombre Firma Izquierda:</label>
              <input
                type="text"
                value={leftSignatureName}
                onChange={(e) => setLeftSignatureName(e.target.value)}
                className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
                placeholder="Mª del Milagro González C."
              />
            </div>

            {/* Right Signature Title */}
            <div>
              <label className="block text-stone-400 mb-1 font-semibold">Cargo Firma Derecha:</label>
              <input
                type="text"
                value={rightSignatureTitle}
                onChange={(e) => setRightSignatureTitle(e.target.value)}
                className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
                placeholder="Profesor del Curso"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-stone-800 flex flex-col gap-2">
            <button
              onClick={handleResetToUserRequest}
              className="w-full py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl font-bold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Aplicar Cambios Solicitados por María Teresa</span>
            </button>

            <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-3 text-[11px] text-stone-400 space-y-1">
              <p className="font-semibold text-stone-300">💡 Instrucciones para presentar:</p>
              <p>1. Presiona <strong className="text-amber-300">"Descargar Imagen (PNG)"</strong> para obtener el certificado en ultra alta resolución (300 DPI) para guardar o adjuntar.</p>
              <p>2. Presiona <strong className="text-emerald-300">"Imprimir / PDF"</strong> para guardarlo en PDF vectorizado directo desde el navegador.</p>
            </div>
          </div>
        </div>

        {/* CERTIFICATE PREVIEW DISPLAY CANVAS (HD DIPLOMA) */}
        <div className="lg:col-span-8 flex flex-col items-center">
          
          <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 no-print bg-stone-950 p-2.5 rounded-xl border border-stone-800">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('ai-image')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'ai-image'
                    ? 'bg-amber-500 text-stone-950 font-black shadow-md'
                    : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Imagen por Aparte (Generada por I.A.)</span>
              </button>

              <button
                onClick={() => setActiveTab('interactive')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'interactive'
                    ? 'bg-amber-500 text-stone-950 font-black shadow-md'
                    : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Editor Imprimible Vectorial</span>
              </button>
            </div>

            <span className="text-[11px] text-amber-400 font-mono font-semibold">
              HD Resolution • Listo para Descargar
            </span>
          </div>

          {activeTab === 'ai-image' ? (
            /* GENERATED AI DIPLOMA IMAGE CONTAINER */
            <div className="w-full bg-stone-950 border border-stone-800 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col items-center text-center space-y-4">
              <div className="w-full relative rounded-xl overflow-hidden border-4 border-amber-600/40 shadow-2xl bg-stone-900">
                <img
                  src={generatedCertImage}
                  alt="Certificado Oficial de Graduación"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 w-full pt-2">
                <a
                  href={generatedCertImage}
                  download="Certificado_Oficial_Graduacion.jpg"
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-300 text-stone-950 font-black rounded-xl text-sm transition flex items-center gap-2 shadow-lg shadow-amber-950/50 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar Imagen Directa (JPG)</span>
                </a>

                <button
                  onClick={handlePrint}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition flex items-center gap-2 shadow-lg shadow-emerald-950/50 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir / PDF</span>
                </button>
              </div>

              <p className="text-xs text-stone-400 max-w-lg">
                ✨ Formato de diploma académico oficial de alta resolución: <strong>{institutionHeader}</strong>, <strong>{studentName}</strong>, <strong>Cédula N° {idNumber}</strong>. Puedes descargar la imagen directa o imprimirla.
              </p>
            </div>
          ) : (
            <>
            {/* PRINTABLE DIPLOMA CONTAINER */}
            <div
              id="printable-certificate-area"
              ref={certRef}
              className={`w-full bg-[#fdfbf7] text-stone-900 p-8 sm:p-12 md:p-16 rounded-sm shadow-2xl border-[12px] border-double border-[#b8860b] relative aspect-[1.414/1] flex flex-col justify-between overflow-hidden select-text cursor-text ${
                activeTab === 'interactive' ? 'block' : 'hidden print:block'
              }`}
              style={{
                fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
              }}
            >
              {/* Elegant Metallic Gold & Royal Navy Multi-Layer Frame */}
              <div className="absolute inset-2 border-2 border-[#d4af37] pointer-events-none" />
              <div className="absolute inset-4 border border-[#0d233a] pointer-events-none" />
              <div className="absolute inset-6 border border-[#b8860b]/30 pointer-events-none" />

              {/* 4 Ornate Gold Corner Ornaments */}
              <div className="absolute top-3 left-3 w-10 h-10 text-[#b8860b] pointer-events-none">
                <svg viewBox="0 0 40 40" className="w-full h-full fill-current">
                  <path d="M0 0 v20 h4 v-16 h16 v-4 h-20 z M8 8 v10 h2 v-8 h8 v-2 h-10 z" />
                  <circle cx="5" cy="5" r="2.5" />
                </svg>
              </div>
              <div className="absolute top-3 right-3 w-10 h-10 text-[#b8860b] pointer-events-none transform rotate-90">
                <svg viewBox="0 0 40 40" className="w-full h-full fill-current">
                  <path d="M0 0 v20 h4 v-16 h16 v-4 h-20 z M8 8 v10 h2 v-8 h8 v-2 h-10 z" />
                  <circle cx="5" cy="5" r="2.5" />
                </svg>
              </div>
              <div className="absolute bottom-3 left-3 w-10 h-10 text-[#b8860b] pointer-events-none transform -rotate-90">
                <svg viewBox="0 0 40 40" className="w-full h-full fill-current">
                  <path d="M0 0 v20 h4 v-16 h16 v-4 h-20 z M8 8 v10 h2 v-8 h8 v-2 h-10 z" />
                  <circle cx="5" cy="5" r="2.5" />
                </svg>
              </div>
              <div className="absolute bottom-3 right-3 w-10 h-10 text-[#b8860b] pointer-events-none transform rotate-180">
                <svg viewBox="0 0 40 40" className="w-full h-full fill-current">
                  <path d="M0 0 v20 h4 v-16 h16 v-4 h-20 z M8 8 v10 h2 v-8 h8 v-2 h-10 z" />
                  <circle cx="5" cy="5" r="2.5" />
                </svg>
              </div>

              {/* TOP HEADER BOX - TEC & ESCUELA DE ADMINISTRACIÓN DE EMPRESAS */}
              <div className="relative z-10 bg-gradient-to-r from-[#0d233a] via-[#1e3a8a] to-[#0d233a] border-b-4 border-[#d4af37] -mx-8 sm:-mx-12 md:-mx-16 -mt-8 sm:-mt-12 md:-mt-16 p-6 sm:p-8 flex items-center justify-between gap-4 text-white shadow-md">
                {/* TEC Logo Symbol & Text */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#0a1829] text-[#fcf6ba] flex items-center justify-center font-black font-sans text-xl sm:text-2xl rounded-sm shadow-md border-2 border-[#d4af37]">
                    TEC
                  </div>
                  <div>
                    <div className="font-extrabold text-[#fcf6ba] text-sm sm:text-base tracking-tight font-sans">
                      TEC
                    </div>
                    <div className="text-[11px] sm:text-xs text-stone-200 font-sans tracking-wide">
                      Instituto Tecnológico de Costa Rica
                    </div>
                  </div>
                </div>

                {/* Institution Header requested: Escuela de Administración de Empresas */}
                <div className="text-right">
                  <h3 className="font-bold text-white text-base sm:text-xl md:text-2xl tracking-tight">
                    {institutionHeader}
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-200 italic font-serif">
                    {institutionSubHeader}
                  </p>
                </div>
              </div>

            {/* MAIN DIPLOMA BODY CONTENT */}
            <div className="my-auto py-4 sm:py-6 text-center space-y-4 sm:space-y-6 relative z-10">
              
              {/* Main Title requested: Certificado de Finalización (Refined delicate smaller font size) */}
              <div className="space-y-1.5 py-1">
                <h2 className="text-base sm:text-xl md:text-2xl font-bold tracking-widest text-stone-900 font-sans uppercase">
                  {certificateType}
                </h2>
                <div className="w-32 sm:w-48 h-0.5 bg-amber-600 mx-auto opacity-70" />
              </div>

              {/* Recipient Section */}
              <div className="space-y-3 py-1">
                <div className="text-center max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-stone-600 italic font-serif tracking-wide">
                  Se confiere el presente certificado a:
                </div>
                <div className="text-lg sm:text-2xl md:text-3xl font-extrabold text-stone-950 font-sans tracking-widest py-1 border-b-2 border-stone-800/60 max-w-2xl mx-auto uppercase">
                  {studentName}
                </div>
                {idNumber && (
                  <div className="text-xs sm:text-sm font-bold text-stone-700 font-mono tracking-widest pt-1">
                    Cédula N° {idNumber}
                  </div>
                )}
              </div>

              {/* Course / Program Section */}
              <div className="space-y-3 py-1">
                <div className="text-center max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-stone-600 italic font-serif tracking-wide">
                  Por haber completado con éxito la:
                </div>
                <div className="text-sm sm:text-xl md:text-2xl font-bold italic text-stone-900 max-w-2xl mx-auto px-4 py-2 border-b border-stone-400/80 leading-relaxed">
                  {programName}
                </div>
              </div>

              {/* Duration & Date Section */}
              <div className="max-w-2xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm md:text-base text-stone-800 pt-2 font-sans">
                <div className="flex items-center gap-2">
                  <span className="font-serif italic text-stone-600">Duración:</span>
                  <span className="font-extrabold text-stone-950 text-sm sm:text-lg underline decoration-amber-600 decoration-2">
                    {duration}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-serif italic text-stone-600">Fecha de emisión:</span>
                  <span className="font-bold text-stone-950">
                    {issueDate}
                  </span>
                </div>
              </div>

            </div>

            {/* BOTTOM SIGNATURES & OFFICIAL SEAL */}
            <div className="relative z-10 pt-4 sm:pt-8 flex items-end justify-between gap-4">
              
              {/* Left Signature: Coordinador de Carrera */}
              <div className="text-center w-52 sm:w-64 space-y-1">
                <div className="h-10 sm:h-14 flex items-end justify-center">
                  <span className="font-serif italic text-blue-900 text-lg sm:text-2xl font-bold tracking-wider opacity-90 font-mono">
                    {leftSignatureName}
                  </span>
                </div>
                <div className="border-t-2 border-stone-800 pt-1">
                  <div className="font-bold text-xs sm:text-sm text-stone-800 font-sans uppercase tracking-wider">
                    {leftSignatureTitle}
                  </div>
                  <div className="text-[10px] sm:text-xs text-stone-600 font-sans">
                    {institutionHeader}
                  </div>
                </div>
              </div>

              {/* Official TEC Stamp representation */}
              <div className="hidden sm:flex flex-col items-center justify-center relative">
                <div className="w-24 h-24 rounded-full border-2 border-sky-800/80 flex flex-col items-center justify-center p-1 text-center text-[9px] text-sky-900 font-sans font-bold leading-tight opacity-85 rotate-[-8deg] shadow-inner bg-sky-50/30">
                  <div className="w-20 h-20 rounded-full border border-sky-700/60 flex flex-col items-center justify-center p-1">
                    <span className="uppercase text-[8px] font-black">Escuela Adm. Empresas</span>
                    <span className="text-[7px]">TEC COSTA RICA</span>
                    <span className="text-[6px] font-mono mt-0.5">2000-06-17</span>
                  </div>
                </div>
              </div>

              {/* Right Signature: Profesor del Curso */}
              <div className="text-center w-52 sm:w-64 space-y-1">
                <div className="h-10 sm:h-14 flex items-end justify-center">
                  <span className="font-serif italic text-blue-900 text-lg sm:text-2xl font-bold tracking-wider opacity-90 font-mono">
                    {rightSignatureName}
                  </span>
                </div>
                <div className="border-t-2 border-stone-800 pt-1">
                  <div className="font-bold text-xs sm:text-sm text-stone-800 font-sans uppercase tracking-wider">
                    {rightSignatureTitle}
                  </div>
                  <div className="text-[10px] sm:text-xs text-stone-600 font-sans">
                    Docente / Cátedra
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Direct Download & Copy Box under the preview */}
          <div className="mt-6 w-full max-w-2xl flex flex-wrap items-center justify-center gap-3 no-print">
            <button
              type="button"
              onClick={handleCopyCertImageCard}
              disabled={isCapturingCertCard}
              className="px-6 py-3.5 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-300 text-stone-950 font-black rounded-xl text-sm transition flex items-center gap-2 shadow-xl shadow-amber-950/50 cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {copiedCertImageCard ? (
                <>
                  <Check className="w-5 h-5 text-stone-950" />
                  <span>¡CUADRO VISUAL COPIADO EN PORTAPAPELES!</span>
                </>
              ) : isCapturingCertCard ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-stone-950" />
                  <span>GENERANDO IMAGEN DEL CUADRO...</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 text-stone-950" />
                  <span>📋 COPIAR CUADRO VISUAL COMPLETO (MARCO Y FIRMAS)</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleCopyCertText}
              className="px-5 py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold rounded-xl text-xs transition flex items-center gap-2 shadow-md cursor-pointer"
            >
              {copiedCertText ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-stone-400" />}
              <span>{copiedCertText ? '¡Texto Copiado!' : 'Copiar Solo Texto'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPNG}
              disabled={isDownloading}
              className="px-5 py-3 bg-stone-800 hover:bg-stone-700 text-amber-300 font-bold rounded-xl text-xs transition flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar Imagen (PNG)</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / PDF</span>
            </button>
          </div>

          {/* SI YA SE GENERÓ LA IMAGEN REAL EN EL EDITOR, SE MUESTRA EL CONTENEDOR CON <img /> PARA CLIC DERECHO NATIVO */}
          {certImageRealUrl && (
            <div className="w-full max-w-2xl mt-5 p-4 bg-stone-950 border-2 border-amber-500 rounded-2xl space-y-3 text-center shadow-2xl no-print animate-fade-in">
              <div className="space-y-1">
                <p className="text-amber-400 font-bold text-xs flex items-center justify-center gap-2 uppercase tracking-wider">
                  <span>🖼️</span>
                  <span>IMAGEN REAL DEL CERTIFICADO EN ALTA RESOLUCIÓN</span>
                </p>
                <p className="text-stone-300 text-[11px]">
                  Esta es una <strong>fotografía/imagen real</strong> de tu título. Puedes hacer <strong>Clic Derecho</strong> sobre ella para ver las opciones nativas de tu navegador: <i>"Guardar imagen como..."</i>, <i>"Copiar imagen"</i> o <i>"Abrir imagen en pestaña nueva"</i>.
                </p>
              </div>

              <div className="relative border-4 border-amber-600/70 rounded-xl overflow-hidden shadow-2xl inline-block max-w-full">
                <img 
                  src={certImageRealUrl} 
                  alt="Certificado TEC Oficial Real" 
                  className="w-full h-auto object-contain max-h-[80vh] cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* CUADRO DE COPIADO DIRECTO DE TEXTO DEL TÍTULO */}
          <div className="w-full max-w-2xl mt-5 p-4 sm:p-5 bg-stone-950 border border-amber-500/40 rounded-2xl text-left space-y-3 shadow-2xl no-print">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-800 pb-2.5">
              <div className="flex items-center gap-2">
                <Copy className="w-4 h-4 text-amber-400" />
                <h5 className="text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wide">
                  📋 Cuadro de Copiado Oficial Directo (Sin PDF)
                </h5>
              </div>
              <button
                type="button"
                onClick={handleCopyCertText}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-lg transition-colors shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                {copiedCertText ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>¡Copiado con Éxito!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Texto Completo</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] text-stone-400">
              Puedes copiar directamente el texto completo, oficial y auténtico de esta certificación para pegarlo donde necesites sin necesidad de generar ni descargar archivos PDF:
            </p>

            <textarea
              readOnly
              rows={7}
              value={getFormattedCertText()}
              className="w-full bg-stone-900 text-amber-100 font-mono text-[11px] p-3 rounded-lg border border-stone-800 focus:outline-none focus:border-amber-500 selection:bg-amber-500 selection:text-stone-950 resize-y"
            />
          </div>
          </>
          )}

        </div>

      </div>

    </div>
  );
}
