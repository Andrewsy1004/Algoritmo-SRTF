
export  function runSRTF({ processes, setTimeline }) {
    let currentTime = 0;
    let completedProcesses = 0;
    let processQueue = processes.map((p) => ({ ...p, remainingTime: p.burstTime }));
    let newTimeline = [];

    while (completedProcesses < processes.length) {
      let availableProcesses = processQueue.filter(
        (p) => p.arrivalTime <= currentTime && p.remainingTime > 0
      );

      if (availableProcesses.length === 0) {
        newTimeline.push({ time: currentTime, processId: null });
        currentTime++;
        continue;
      }

      let currentProcess = availableProcesses.reduce((prev, current) =>
        prev.remainingTime < current.remainingTime ? prev : current
      );

      newTimeline.push({ time: currentTime, processId: currentProcess.id });
      currentProcess.remainingTime--;
      currentTime++;

      if (currentProcess.remainingTime === 0) {
        completedProcesses++;
      }
    }

    setTimeline(newTimeline);
}