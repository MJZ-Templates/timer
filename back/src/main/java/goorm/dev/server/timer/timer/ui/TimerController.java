package goorm.dev.server.timer.ui;

import goorm.dev.server.timer.app.TimerService;
import goorm.dev.server.timer.app.dto.TimerDto;
import goorm.dev.server.timer.repo.mongo.entity.Timer;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/timers")
public class TimerController {
    private final TimerService timerService;

    @GetMapping
    public List<Timer> getAllTimers() {
        return timerService.getAllTimers();
    }

    @GetMapping("/{id}")
    public Optional<Timer> getTimerById(@PathVariable String id) {
        return timerService.getTimerById(id);
    }

    @PostMapping
    public Timer createTimer(@RequestBody TimerDto timerDto) {
        return timerService.createTimer(timerDto);
    }

    @DeleteMapping("/{id}")
    public void deleteTimer(@PathVariable String id) {
        timerService.deleteTimer(id);
    }

    @PutMapping("/{id}")
    public void putTimer(@PathVariable String id, @RequestBody TimerDto dto) {
        timerService.putTimer(id, dto);
    }
}
