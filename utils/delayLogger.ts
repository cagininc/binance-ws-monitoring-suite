

import fs from 'fs';
import path from 'path';

interface DelayEntry {
  runAt: string;         // Test’in çalıştırıldığı zaman
  timestamps: number[];  // Her mesajın alındığı milisaniye damgaları
  delays: number[];      // Ardışık mesajlar arasındaki gecikmeler
  maxDelay: number;      // Gecikmeler içindeki maksimum değer
  averageDelay: number;  // Gecikmelerin ortalaması
}

/**
 * 1) Her test run’ı için gecikme verisini JSON dosyasına “append” eder.
 *    
 */
export function appendLatencyJson(
  timestamps: number[],
  fileName = 'Binance_Trade_Delay_Log.json'
): void {
  // 1. Çıktı klasörünü ayarla ve yoksa oluştur
  const reportDir = path.resolve(__dirname, '..', 'allure-results');
  if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });

  const filePath = path.join(reportDir, fileName);

  // 2. Mevcut dosyayı oku veya yeni bir dizi başlat
  let logArray: DelayEntry[] = [];
  if (fs.existsSync(filePath)) {
    try {
      logArray = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch {
      logArray = [];
    }
  }

  // 3. delays dizisini hesapla
  const delays = timestamps
    .slice(1)
    .map((t, i) => t - timestamps[i]);

  // 4. metrikleri hesapla
  const maxDelay = delays.length ? Math.max(...delays) : 0;
  const averageDelay = delays.length
    ? delays.reduce((sum, d) => sum + d, 0) / delays.length
    : 0;

  // 5. yeni bir log girişi oluştur
  const entry: DelayEntry = {
    runAt: new Date().toISOString(),
    timestamps,
    delays,
    maxDelay,
    averageDelay,
  };

  // 6. mevcut diziye ekle ve dosyaya yaz
  logArray.push(entry);
  fs.writeFileSync(filePath, JSON.stringify(logArray, null, 2), 'utf-8');
  console.log(`Appended latency entry to ${filePath}`);
}

/**
 * 2) Tüm geçmiş gecikme verilerini alır ve Chart.js kullanarak
 *    basit bir çizgi grafik barındıran HTML sayfası oluşturur.
 */
export function generateLatencyHtml(
  jsonFileName = 'Binance_Trade_Delay_Log.json',
  htmlFileName = 'Latency_Report.html'
): string {
  const reportDir = path.resolve(__dirname, '..', 'allure-results');
  const jsonPath = path.join(reportDir, jsonFileName);
  const htmlPath = path.join(reportDir, htmlFileName);

  // 3. Chart.js tabanlı HTML 
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>WebSocket Latency Report</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <h2>Latency Over Test Runs</h2>
<p style="font-size:14px; color:#666;">
Showing max delays based on the latest test cycles.</p>  <canvas id="latencyChart" width="800" height="400"></canvas>
  <script>
    // 4. JSON dosyasını fetch ile al
    fetch('${jsonFileName}')
      .then(res => res.json())
      .then(data => {
        // 5. Çizim için etiketler ve değerler
        const labels = data.map(e => new Date(e.runAt).toLocaleTimeString());
        const values = data.map(e => e.maxDelay);
        new Chart(document.getElementById('latencyChart'), {
          type: 'line',
          data: {
            labels,
            datasets: [{
              label: 'Max Delay (ms)',
              data: values,
              fill: true,
              tension: 0.1
            }]
          },
          options: {
            scales: {
              y: { beginAtZero: true }
            }
          }
        });
      });
  </script>
</body>
</html>`;

  // 6saving html
  fs.writeFileSync(htmlPath, html, 'utf-8');
  console.log(`Generated HTML report at ${htmlPath}`);
  return html;
}
