
package com.mycompany.manicure;


public class HoraMarcada {
    private String dia;
    private String hora;
    private Cliente cliente;

     public HoraMarcada (String dia, String hora, Cliente cliente){
        setDia(dia);
        setHora(hora);
        setCliente(cliente);
    }
    
    
    public String getDia() {
        return dia;
    }

    public void setDia(String dia) {
        if(!dia.isBlank()){
        this.dia = dia;
        }
    }

    public String getHora() {
        return hora;
    }

    public void setHora(String hora) {
        if(!hora.isBlank()){
        this.hora = hora;
        }
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        if(cliente != null){
        this.cliente = cliente;
        }
    }
    
     @Override
    public String toString(){
        String horaMarcada = """
                     %sDia: %s
                     hora: %s
                     ************************
                     """;
        String horaMarcadaFormatada = String.format(horaMarcada, cliente, dia, hora);
        
        return horaMarcadaFormatada;
    }
    
}

