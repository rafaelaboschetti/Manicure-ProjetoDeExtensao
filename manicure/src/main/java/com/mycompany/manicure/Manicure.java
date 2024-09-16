

package com.mycompany.manicure;

import java.util.ArrayList;
import java.util.List;

public class Manicure {

    public static void main(String[] args) {
        
        //Criando clientes
        Cliente anaBeatriz = new Cliente("Ana", "Beatriz");
        Cliente carlaFontes = new Cliente("Carla", "Fontes");
        
        //Criando Hora Marcadas
        HoraMarcada horaAna = new HoraMarcada("11 de Outubro", "11:00", anaBeatriz);
        HoraMarcada horaCarla = new HoraMarcada("10 de Outubro", "12:00", carlaFontes);
        
        //Criando Lista de Agendamento
        List <HoraMarcada> agendamentoGerais = new ArrayList <HoraMarcada>(); 
        agendamentoGerais.add(horaAna);
        agendamentoGerais.add(horaCarla);
        
        //Criando Agenda (Talvez separar por dia ou semana)
        Agenda agendaPrincipal = new Agenda (agendamentoGerais);
        System.out.println(agendaPrincipal);
    }
}
