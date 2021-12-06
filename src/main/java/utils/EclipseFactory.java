package utils;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class EclipseFactory {
    private static EntityManagerFactory emf;

    static public EntityManagerFactory getEMF (){
        if (emf == null){
            emf = Persistence.createEntityManagerFactory("default");
        }
        return emf;
    }
}
