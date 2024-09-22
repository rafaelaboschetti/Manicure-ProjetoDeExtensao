
package com.nfproject.manicure;

import java.util.List;

public class Agenda {
    private List <HoraMarcada> agendamento;

     public Agenda (List <HoraMarcada> agendamento){
        this.agendamento = agendamento;
    }
    
    
     public void addMusicas(HoraMarcada agendamento) {
        this.agendamento.add(agendamento);
    }
    
     @Override
    public String toString(){
        String agenda = 
                """ 
            ************ Agenda Principal************
            """;
              for(int i = 0; i<agendamento.size(); i++){
                HoraMarcada horaMarcada = agendamento.get(i);
                agenda += horaMarcada.toString();
               }
              String agendaFormatada = String.format(agenda);
        return agendaFormatada;
    }
}
