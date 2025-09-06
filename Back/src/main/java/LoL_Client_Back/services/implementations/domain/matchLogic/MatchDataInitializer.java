package LoL_Client_Back.services.implementations.domain.matchLogic;

import LoL_Client_Back.entities.domain.MatchEntity;
import LoL_Client_Back.repositories.domain.MatchRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@Component
public class MatchDataInitializer {

    @Autowired
    MatchRepository matchRepository;
    @Autowired
    DamageEstimatorService damageEstimatorService;

    public MatchDataInitializer(MatchRepository matchRepository,
                                DamageEstimatorService damageEstimatorService) {
        this.matchRepository = matchRepository;
        this.damageEstimatorService = damageEstimatorService;
    }

    @EventListener(ApplicationReadyEvent.class)
    @Transactional
    public void initDamage() {
        int pageSize = 50; // iteramos 50 partidas por vez
        int pageNumber = 0;
        Page<MatchEntity> page;

        do {
            Pageable pageable = PageRequest.of(pageNumber, pageSize);
            page = matchRepository.findAll(pageable);

            // Distribuimos daño en cada match de la página
            page.getContent().forEach(damageEstimatorService::distributeDamage);

            // Guardamos toda la página de una sola vez
            matchRepository.saveAll(page.getContent());

            pageNumber++;
        } while (page.hasNext());

        System.out.println("✅ Daños inicializados para todas las partidas");
    }
}
