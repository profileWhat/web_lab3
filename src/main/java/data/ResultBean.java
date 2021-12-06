package data;

import javax.annotation.PreDestroy;
import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class ResultBean implements Serializable {
    private final DateTimeFormatter formatter;

    private List<Result> entryBeansContainer;
    private Result currentResult;

    private EntityManagerFactory entityManagerFactory;
    private EntityManager entityManager;
    private EntityTransaction transaction;


    public ResultBean() {
        System.out.println("Created!");
        formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd hh:mm:ss");
        entryBeansContainer = new ArrayList<>();
        establishConnectionWithDB();
        loadAllEntries();
        currentResult = new Result();
    }

    synchronized private void establishConnectionWithDB() {
        entityManagerFactory = Persistence.createEntityManagerFactory("persist");
        entityManager = entityManagerFactory.createEntityManager();
        transaction = entityManager.getTransaction();
        System.out.println("connected");
    }

    synchronized private void loadAllEntries() {
        try {
            transaction.begin();
            Query query = entityManager.createQuery("SELECT d FROM Result d");
            entryBeansContainer = query.getResultList();
            transaction.commit();
        } catch (Exception e) {
            if (transaction.isActive()) {
                transaction.rollback();
            }
            throw e;
        }
    }

    public String addEntry() {
        try {
            transaction.begin();
            System.out.println("Add");
            currentResult.checkIfHit();
            LocalDateTime localDateTime = LocalDateTime.now();
            String time = localDateTime.format(formatter);
            currentResult.setCurrentTime(time);
            entryBeansContainer.add(currentResult);
            System.out.println(currentResult);
            entityManager.persist(currentResult);
            transaction.commit();
            currentResult = new Result();
        } catch (Exception e) {
            if (transaction.isActive()) {
                transaction.rollback();
            }
            throw e;
        }
        return "Added";
    }

    public String clearEntries() {
        try {
            transaction.begin();
            Query query = entityManager.createQuery("DELETE FROM Result ");
            query.executeUpdate();
            System.out.println("Clear");
            entryBeansContainer.clear();
            transaction.commit();
        } catch (RuntimeException exception) {
            if (transaction.isActive()) {
                transaction.rollback();
            }
            throw exception;
        }
        return "Cleared";
    }

    public Result getCurrentResult() {
        return currentResult;
    }


    public List<Result> getEntryBeansContainer() {
        return entryBeansContainer;
    }

    @PreDestroy
    public void close() {
        if (entityManager.isOpen()) entityManager.close();
        if (entityManagerFactory.isOpen()) entityManagerFactory.close();
    }

}



