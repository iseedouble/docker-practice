package hello;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.mongodb.MongoCredential;
import com.mongodb.ConnectionString;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.*;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Projections;
import com.mongodb.client.model.Filters;
import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.Projections.*;
import com.mongodb.client.model.Sorts;
import java.util.Arrays;
import org.bson.Document;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        
        try {
            char[] password = "example".toCharArray();
            MongoCredential credential = MongoCredential.createCredential("root", "admin", password);

            MongoClient mongoClient = MongoClients.create(
            MongoClientSettings.builder()
                .applyToClusterSettings(builder -> 
                    builder.hosts(Arrays.asList(new ServerAddress("mongo", 27017))))
                .credential(credential)
                .build());
    
            MongoDatabase database = mongoClient.getDatabase("test");
            MongoCollection<Document> collection = database.getCollection("users");
            
            Document myDoc = collection.find().first();
            System.out.println(myDoc.toJson());
        } catch (Exception e) {
            System.out.println("DEBUuuuuuuuuuuuG");
            System.out.println(e);
        }

        SpringApplication.run(Application.class, args);
    }
}