package com.finance.app.controller;

import com.finance.app.model.Transaction;
import com.finance.app.service.FinanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allow access from any device on local network
public class FinanceController {

    @Autowired
    private FinanceService service;

    @GetMapping("/transactions")
    public List<Transaction> getAllTransactions() {
        return service.getAllTransactions();
    }

    @PostMapping("/transactions")
    public Transaction addTransaction(@RequestBody Transaction transaction) {
        return service.addTransaction(transaction);
    }

    @GetMapping("/reports/monthly")
    public Map<String, Object> getMonthlyReport(@RequestParam int year, @RequestParam int month) {
        return service.getMonthlyReport(year, month);
    }
}
