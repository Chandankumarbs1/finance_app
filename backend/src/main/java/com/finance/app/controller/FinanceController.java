package com.finance.app.controller;

import com.finance.app.model.Transaction;
import com.finance.app.service.FinanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allow access from any device on local network
public class FinanceController {

    @Autowired
    private FinanceService service;

    @GetMapping("/transactions")
    public List<Transaction> getAllTransactions(Principal principal) {
        return service.getAllTransactions(principal.getName());
    }

    @PostMapping("/transactions")
    public Transaction addTransaction(@RequestBody Transaction transaction, Principal principal) {
        return service.addTransaction(transaction, principal.getName());
    }

    @GetMapping("/reports/monthly")
    public Map<String, Object> getMonthlyReport(@RequestParam int year, @RequestParam int month, Principal principal) {
        return service.getMonthlyReport(year, month, principal.getName());
    }
}
