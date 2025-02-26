package goorm.dev.server.timer.app;

import goorm.dev.server.timer.app.dto.TimerDto;
import goorm.dev.server.timer.repo.mongo.TimerRepository;
import goorm.dev.server.timer.repo.mongo.entity.Timer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class TimerService {

    private final TimerRepository timerRepository;

    public List<Timer> getAllTimers() {
        return timerRepository.findAll();
    }

    public Optional<Timer> getTimerById(String id) {
        return timerRepository.findById(id);
    }

    public Timer createTimer(TimerDto dto) {
        Timer timer = new Timer(null, dto.duration(), dto.duration());
        return timerRepository.save(timer);
    }

    public void deleteTimer(String id) {
        timerRepository.deleteById(id);
    }

    public void putTimer(String id, TimerDto dto) {
        log.info("dto.durations={}", dto.duration());

        Timer timer = getTimerById(id).orElseThrow();
        timer.updateDuration(dto.duration());
        timerRepository.save(timer);
    }
}
