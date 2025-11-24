package com.finance.app.repository;

import com.finance.app.model.Transaction;
import com.finance.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByDateBetweenAndUser(LocalDate startDate, LocalDate endDate, User user);
    List<Transaction> findByUser(User user);
}
