package com.nfproject.manicure;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class WebController {
    
    
    @GetMapping("/agendamentos")
    public List<HoraMarcada> getAgendamentos() {
        Cliente anaBeatriz = new Cliente("Ana", "Beatriz");
        Cliente carlaFontes = new Cliente("Carla", "Fontes");
        
        HoraMarcada horaAna = new HoraMarcada("11 de Outubro", "11:00", anaBeatriz);
        HoraMarcada horaCarla = new HoraMarcada("10 de Outubro", "12:00", carlaFontes);
        
        List<HoraMarcada> agendamentoGerais = new ArrayList<>();
        agendamentoGerais.add(horaAna);
        agendamentoGerais.add(horaCarla);
        
        return agendamentoGerais;
    }
}
