package goorm.dev.server.timer.timer.repo.mongo.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "timers")
public class Timer {

    @Id
    private String id;
    private long entireDuration;
    private long duration;

    public void updateDuration(long duration) {
        this.duration = duration;
    }
}
