import { ArrowLeft, FileText } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Renk paleti
const colors = {
  primary: '#003507',
  complement: '#327DA9',
  accent1: '#F6BE00',
  accent2: '#E66E24',
  accent3: '#840028',
  accent4: '#42892E',
  accent5: '#7C235E',
  neutral1: '#404048',
  neutral2: '#63666A',
  neutral3: '#D0D0CD'
};

const ReportSystem = () => {
  const [currentPage, setCurrentPage] = useState('list');
  const [selectedReportId, setSelectedReportId] = useState(null);
  
  const reports = [
    {
      id: 1,
      name: "Satış Raporu 2024",
      description: "Aylık satış analizi ve performans değerlendirmesi",
      date: "2024-03-15",
      type: "Finansal"
    },
    {
      id: 2,
      name: "Müşteri Memnuniyeti Raporu",
      description: "Müşteri geri bildirimleri ve memnuniyet analizi",
      date: "2024-03-14",
      type: "Müşteri İlişkileri"
    },
    {
      id: 3,
      name: "Stok Durum Raporu",
      description: "Güncel stok seviyesi ve hareket analizi",
      date: "2024-03-13",
      type: "Envanter"
    },
    {
      id: 4,
      name: "Personel Performans Raporu",
      description: "Çalışan performans metrikleri ve değerlendirmeler",
      date: "2024-03-12",
      type: "İK"
    }
  ];

  // Genişletilmiş veri seti
  const reportData = {
    table1Data: [
      { id: 1, month: "Ocak", sales: 45000, profit: 15000, customers: 150 },
      { id: 2, month: "Şubat", sales: 52000, profit: 18000, customers: 165 },
      { id: 3, month: "Mart", sales: 48000, profit: 16500, customers: 158 },
      { id: 4, month: "Nisan", sales: 55000, profit: 19500, customers: 172 },
      { id: 5, month: "Mayıs", sales: 51000, profit: 17800, customers: 168 },
      { id: 6, month: "Haziran", sales: 58000, profit: 20500, customers: 180 }
    ],
    table2Data: [
      { id: 1, category: "Elektronik", totalSales: 25000, growth: "+15%", stock: 450 },
      { id: 2, category: "Giyim", totalSales: 18000, growth: "+8%", stock: 850 },
      { id: 3, category: "Aksesuar", totalSales: 12000, growth: "+12%", stock: 320 }
    ]
  };

  const handleReportClick = (reportId) => {
    setSelectedReportId(reportId);
    setCurrentPage('detail');
  };

  const handleBack = () => {
    setCurrentPage('list');
    setSelectedReportId(null);
  };

  const ReportList = () => (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6" style={{ color: colors.primary }}>Raporlar</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (
          <Card 
            key={report.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleReportClick(report.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: `${colors.complement}20` }}>
                  <FileText className="w-6 h-6" style={{ color: colors.complement }} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2" style={{ color: colors.primary }}>{report.name}</h2>
                  <p className="text-sm mb-3" style={{ color: colors.neutral2 }}>{report.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: colors.neutral2 }}>{report.date}</span>
                    <span className="px-3 py-1 rounded-full text-sm" 
                          style={{ backgroundColor: `${colors.primary}10`, color: colors.primary }}>
                      {report.type}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const ReportDetail = () => {
    const chartData = reportData.table1Data.map(item => ({
      name: item.month,
      Satış: item.sales,
      Kâr: item.profit,
      Müşteri: item.customers
    }));

    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow">
          <div className="w-16 h-16 rounded" style={{ backgroundColor: `${colors.complement}20` }}>
            <div className="w-full h-full flex items-center justify-center">
              <FileText className="w-8 h-8" style={{ color: colors.complement }} />
            </div>
          </div>
          
          <h1 className="text-2xl font-semibold" style={{ color: colors.primary }}>
            {reports.find(r => r.id === selectedReportId)?.name || 'Rapor Detayı'}
          </h1>
          
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
            style={{ 
              backgroundColor: `${colors.neutral3}30`,
              color: colors.neutral1,
            }}
          >
            <ArrowLeft className="w-5 h-5" />
            Geri
          </button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4" style={{ color: colors.primary }}>
              Aylık Satış Verileri
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr style={{ backgroundColor: `${colors.neutral3}30` }}>
                    <th className="p-3 text-left border" style={{ color: colors.neutral1 }}>Ay</th>
                    <th className="p-3 text-left border" style={{ color: colors.neutral1 }}>Satış</th>
                    <th className="p-3 text-left border" style={{ color: colors.neutral1 }}>Kar</th>
                    <th className="p-3 text-left border" style={{ color: colors.neutral1 }}>Müşteri Sayısı</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.table1Data.map((row) => (
                    <tr key={row.id}>
                      <td className="p-3 border" style={{ color: colors.neutral2 }}>{row.month}</td>
                      <td className="p-3 border" style={{ color: colors.neutral2 }}>{row.sales.toLocaleString()} ₺</td>
                      <td className="p-3 border" style={{ color: colors.neutral2 }}>{row.profit.toLocaleString()} ₺</td>
                      <td className="p-3 border" style={{ color: colors.neutral2 }}>{row.customers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4" style={{ color: colors.primary }}>
              Kategori Bazlı Analiz
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr style={{ backgroundColor: `${colors.neutral3}30` }}>
                    <th className="p-3 text-left border" style={{ color: colors.neutral1 }}>Kategori</th>
                    <th className="p-3 text-left border" style={{ color: colors.neutral1 }}>Toplam Satış</th>
                    <th className="p-3 text-left border" style={{ color: colors.neutral1 }}>Büyüme</th>
                    <th className="p-3 text-left border" style={{ color: colors.neutral1 }}>Stok</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.table2Data.map((row) => (
                    <tr key={row.id}>
                      <td className="p-3 border" style={{ color: colors.neutral2 }}>{row.category}</td>
                      <td className="p-3 border" style={{ color: colors.neutral2 }}>{row.totalSales.toLocaleString()} ₺</td>
                      <td className="p-3 border" style={{ color: colors.accent1 }}>{row.growth}</td>
                      <td className="p-3 border" style={{ color: colors.neutral2 }}>{row.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4" style={{ color: colors.primary }}>
              Performans Grafiği
            </h2>
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.neutral3} />
                  <XAxis dataKey="name" stroke={colors.neutral2} />
                  <YAxis stroke={colors.neutral2} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      borderColor: colors.neutral3,
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Satış"
                    stroke={colors.primary}
                    strokeWidth={2}
                    dot={{ fill: colors.primary }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Kâr"
                    stroke={colors.complement}
                    strokeWidth={2}
                    dot={{ fill: colors.complement }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Müşteri"
                    stroke={colors.accent4}
                    strokeWidth={2}
                    dot={{ fill: colors.accent4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div>
      {currentPage === 'list' ? <ReportList /> : <ReportDetail />}
    </div>
  );
};

export default ReportSystem;