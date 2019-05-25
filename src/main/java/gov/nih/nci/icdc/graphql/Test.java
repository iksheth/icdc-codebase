package gov.nih.nci.icdc.graphql;

import java.util.ArrayList;
import java.util.List;

import org.neo4j.driver.v1.AuthTokens;
import org.neo4j.driver.v1.Driver;
import org.neo4j.driver.v1.GraphDatabase;
import org.neo4j.driver.v1.Session;
import org.neo4j.driver.v1.StatementResult;
import org.neo4j.driver.v1.Transaction;
import org.neo4j.driver.v1.TransactionWork;

public class Test {
	private static List<String> matchPersonNodes( Transaction tx )
	{
	    List<String> names = new ArrayList<>();
	    StatementResult result = tx.run( "MATCH (n:Movie) RETURN n LIMIT 25" );
	    while ( result.hasNext() )
	    {
	        names.add( result.next().get( 0 ).asString() );
	    }
	    return names;
	}
	
	
	  public static void main( String... args ) {

			Driver driver = GraphDatabase.driver("bolt://localhost", AuthTokens.basic("neo4j", "12345678"));
			Session session = driver.session();
			List<String> strs = session.readTransaction(new TransactionWork<List<String>>() {

				@Override
				public List<String> execute(Transaction tx) {
					return matchPersonNodes(tx);
				}
			});
			for(String str :strs) {
				System.out.print(str);
			}
			driver.close();
		}


}
