package goorm.dev.server.timer.common.web.ui;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/api")
    public String healthCheck() {
        return "ok";
    }
}
