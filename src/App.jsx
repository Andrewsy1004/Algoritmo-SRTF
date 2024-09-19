import { useState, useEffect } from 'react';

import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

import { toast } from "react-hot-toast";

import { runSRTF } from './helper';
import { Navbar, Introduction, Footer } from './components';

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export const App = () => {
  const [newProcess, setNewProcess] = useState({ arrivalTime: 0, burstTime: 1, color: '#ff7300' });
  const [timeline, setTimeline] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [processes, setProcesses] = useState([
    { id: 1, arrivalTime: 0, burstTime: 8, remainingTime: 8, color: '#8884d8' },
    { id: 2, arrivalTime: 1, burstTime: 4, remainingTime: 4, color: '#82ca9d' },
    { id: 3, arrivalTime: 2, burstTime: 2, remainingTime: 2, color: '#ffc658' },
  ]);

  const handleScheduling = () => {
    const allValid = processes.every(
      (process) => process.burstTime >= 1 && process.arrivalTime >= 0
    );

    if (!allValid) {
      toast.error('Todos los procesos deben tener un tiempo de ejecución mayor o igual a 1 y un tiempo de llegada mayor o igual a 0');
      return;
    }

    runSRTF({ processes, setTimeline });
    setVisibleSteps(0);
    setIsPlaying(false);
  };

  const addProcess = () => {
    const newId = processes.length + 1;
    setProcesses([...processes, { ...newProcess, id: newId, remainingTime: newProcess.burstTime }]);
    setNewProcess({ arrivalTime: 0, burstTime: 1, color: '#ff7300' });
  };

  const updateProcess = (id, field, value) => {
    setProcesses(
      processes.map((p) =>
        p.id === id ? { ...p, [field]: field === 'color' ? value : parseInt(value) } : p
      )
    );
  };

  const chartData = {
    labels: timeline.slice(0, visibleSteps).map((item) => ` ${item.time}`),
    datasets: processes.map((process) => ({
      label: `P${process.id}`,
      data: timeline.slice(0, visibleSteps).map((item) => item.processId === process.id ? 1 : 0),
      backgroundColor: process.color,
      stack: 'stack1',
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { stacked: true },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  useEffect(() => {
    let intervalId;
    if (isPlaying && visibleSteps < timeline.length) {
      intervalId = setInterval(() => {
        setVisibleSteps((prev) => Math.min(prev + 1, timeline.length));
      }, 2000);
    }
    return () => clearInterval(intervalId);
  }, [isPlaying, visibleSteps, timeline.length]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleShowAll = () => {
    setVisibleSteps(timeline.length);
    setIsPlaying(false);
  };

  const handleReset = () => {
    setVisibleSteps(0);
    setIsPlaying(false);
  };

  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      <Navbar />
      <Introduction />

      <section id="example" className="p-8 bg-white shadow-md my-8 mx-4 rounded-lg">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Ejemplo Interactivo</h2>
        <p className="text-lg mb-4">
          En el siguiente ejemplo puedes agregar procesos, modificar sus tiempos de llegada y ejecución, y observar cómo se ejecuta el algoritmo SRTF.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <input
            type="number"
            value={newProcess.arrivalTime}
            onChange={(e) => setNewProcess({ ...newProcess, arrivalTime: parseInt(e.target.value) })}
            placeholder="Tiempo de Llegada"
            className="p-2 border rounded shadow focus:ring-2 focus:ring-blue-300 focus:outline-none"
          />
          <input
            type="number"
            value={newProcess.burstTime}
            onChange={(e) => setNewProcess({ ...newProcess, burstTime: parseInt(e.target.value) })}
            placeholder="Tiempo de Ejecución"
            className="p-2 border rounded shadow focus:ring-2 focus:ring-blue-300 focus:outline-none"
          />
          <input
            type="color"
            value={newProcess.color}
            onChange={(e) => setNewProcess({ ...newProcess, color: e.target.value })}
            className="p-2 border rounded shadow h-10 w-20"
          />
          <button
            onClick={addProcess}
            className="p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition duration-300"
          >
            Añadir Proceso
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full bg-white border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Llegada</th>
                <th className="border border-gray-300 px-4 py-2">Duración</th>
                <th className="border border-gray-300 px-4 py-2">Color</th>
              </tr>
            </thead>
            <tbody>
              {processes.map((process) => (
                <tr key={process.id}>
                  <td className="border border-gray-300 px-4 py-2">P{process.id}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      value={process.arrivalTime}
                      onChange={(e) => updateProcess(process.id, 'arrivalTime', e.target.value)}
                      className="w-full p-1 border rounded"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      value={process.burstTime}
                      onChange={(e) => updateProcess(process.id, 'burstTime', e.target.value)}
                      className="w-full p-1 border rounded"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="color"
                      value={process.color}
                      onChange={(e) => updateProcess(process.id, 'color', e.target.value)}
                      className="w-20 h-8 p-1 border rounded"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="simulation" className="p-8 bg-white shadow-md my-8 mx-4 rounded-lg">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Simulación SRTF</h2>
        <button
          onClick={handleScheduling}
          className="w-full p-3 bg-green-500 text-white rounded shadow mb-6 hover:bg-green-600 transition duration-300"
        >
          Ejecutar Simulación
        </button>

        {timeline.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Línea de Tiempo de Ejecución</h3>
            <div className="bg-white p-4 rounded-lg shadow-md" style={{ height: '500px', maxWidth: '2000px', margin: '0 auto' }}>
              <Bar data={chartData} options={options} />
            </div>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={handlePlayPause}
                className="p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition duration-300"
              >
                {isPlaying ? 'Pausar' : 'Reproducir'}
              </button>
              <button
                onClick={handleShowAll}
                className="p-2 bg-purple-500 text-white rounded shadow hover:bg-purple-600 transition duration-300"
              >
                Mostrar Todo
              </button>
              <button
                onClick={handleReset}
                className="p-2 bg-red-500 text-white rounded shadow hover:bg-red-600 transition duration-300"
              >
                Reiniciar
              </button>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};
