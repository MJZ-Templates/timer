package goorm.dev.server.timer.repo.mongo;

import goorm.dev.server.timer.repo.mongo.entity.Timer;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TimerRepository extends MongoRepository<Timer, String> {}

