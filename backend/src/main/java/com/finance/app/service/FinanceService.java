package com.finance.app.service;

import com.finance.app.model.Transaction;
import com.finance.app.model.TransactionType;
import com.finance.app.model.User;
import com.finance.app.repository.TransactionRepository;
import com.finance.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FinanceService {

    @Autowired
    private TransactionRepository repository;

    @Autowired
    private com.finance.app.repository.UserRepository userRepository;

    public List<Transaction> getAllTransactions(String username) {
        User user = userRepository.findByUsername(username).orElseThrow();
        return repository.findByUser(user);
    }

    public Transaction addTransaction(Transaction transaction, String username) {
        User user = userRepository.findByUsername(username).orElseThrow();
        transaction.setUser(user);
        return repository.save(transaction);
    }

    public Map<String, Object> getMonthlyReport(int year, int month, String username) {
        User user = userRepository.findByUsername(username).orElseThrow();
        YearMonth yearMonth = YearMonth.of(year, month);
        LocalDate startDate = yearMonth.atDay(1);
        LocalDate endDate = yearMonth.atEndOfMonth();

        List<Transaction> transactions = repository.findByDateBetweenAndUser(startDate, endDate, user);

        double totalIncome = transactions.stream()
                .filter(t -> t.getType() == TransactionType.CREDIT)
                .mapToDouble(Transaction::getAmount)
                .sum();

        double totalExpense = transactions.stream()
                .filter(t -> t.getType() == TransactionType.DEBIT)
                .mapToDouble(Transaction::getAmount)
                .sum();

        double balance = totalIncome - totalExpense;

        Map<String, Object> report = new HashMap<>();
        report.put("income", totalIncome);
        report.put("expense", totalExpense);
        report.put("balance", balance);
        report.put("transactions", transactions);

        return report;
    }
}
