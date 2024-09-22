package com.nfproject.manicure;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebController {
    
    @RequestMapping("/hello")
    public String sayHello(){
        System.out.println("Saying hello... olá");
        return "hello big fallout player";
    }
}
