import { create } from "zustand";
import {
  fetchTimers,
  createTimer,
  deleteTimer,
  updateTimer,
} from "../api/timerApi";

const useTimerStore = create((set) => ({
  timers: [],
  loadTimers: async () => {
    const timers = await fetchTimers();
    set({ timers });
  },
  addTimer: async (data) => {
    const newTimer = await createTimer(data);
    set((state) => ({ timers: [...state.timers, newTimer] }));
  },
  removeTimer: async (id) => {
    await deleteTimer(id);
    set((state) => ({
      timers: state.timers.filter((timer) => timer.id !== id),
    }));
  },
  updateTimer: async (id, data) => {
    set((state) => ({
      timers: state.timers.map((timer) =>
        timer.id === id ? { ...timer, ...data } : timer
      ),
    }));
    await updateTimer(id, data);
  },
}));

export default useTimerStore;
