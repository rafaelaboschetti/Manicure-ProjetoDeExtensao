
package com.mycompany.manicure;


public class Cliente {
    private String nome;
    private String sobreNome;

    public Cliente (String nome, String sobreNome){
        setNome(nome);
        setSobreNome(sobreNome);
    }
    
    
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
         if(!nome.isBlank()){
        this.nome = nome;
         }
    }

    public String getSobreNome() {
        return sobreNome;
    }

    public void setSobreNome(String sobreNome) {
        if(!sobreNome.isBlank()){
        this.sobreNome = sobreNome;
        }
    }
    
    @Override
    public String toString(){
        String cliente = """
                     Cliente: %s %s
                     """;
        String clientesFormatados = String.format(cliente, nome, sobreNome);
        
        return clientesFormatados;
    }
    
}
