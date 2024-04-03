package com.leonardo.ABAC.demo.controllers;

import com.leonardo.ABAC.demo.entities.ResponseJson;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/sede")
public class ExampleController {

    @GetMapping
    public ResponseEntity<ResponseJson> getPublic() {
        ResponseJson response = new ResponseJson("Questa risorsa è accessibile da chiunque.");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/all")
    public ResponseEntity<ResponseJson> getAll() {
        ResponseJson response = new ResponseJson("Questa risorsa è accessibile solo dalle sedi di Roma e Chieti.");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/roma")
    public ResponseEntity<ResponseJson> getRoma() {
        ResponseJson response = new ResponseJson("Questa risorsa è accessibile solo dalla sede di Roma.");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/chieti")
    public ResponseEntity<ResponseJson> getChieti() {
        ResponseJson response = new ResponseJson("Questa risorsa è accessibile solo dalla sede di Chieti.");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/roma/protected")
    public ResponseEntity<ResponseJson> getRomaProtected() {
        ResponseJson response = new ResponseJson("Questa risorsa è accessibile solo dalla sede di Roma con email Leonardo.");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/chieti/protected")
    public ResponseEntity<ResponseJson> getChietiProtected() {
        ResponseJson response = new ResponseJson("Questa risorsa è accessibile solo dalla sede di Chieti con email Leonardo.");
        return ResponseEntity.ok(response);
    }
}