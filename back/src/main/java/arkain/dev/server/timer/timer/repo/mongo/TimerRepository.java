package arkain.dev.server.timer.timer.repo.mongo;

import arkain.dev.server.timer.timer.repo.mongo.entity.Timer;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TimerRepository extends MongoRepository<Timer, String> {}

