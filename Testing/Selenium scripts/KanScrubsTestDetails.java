package frontendTesting;

import java.util.ArrayList;
import java.util.Iterator;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class KanScrubsTestDetails {
	static String myUserName = "escistd50.003";
	static String myPassword = "IAmJohnDoes1!";
	static ArrayList<String> usernameList = new ArrayList<String>();
	public static void main(String[] args) throws InterruptedException {
		
		// Add random invalid usernames to the ArrayList to be entered in sequence to our login input form.
		usernameList.add("3");
	    usernameList.add("03");
	    usernameList.add("003");
	    usernameList.add(".003");
	    usernameList.add("0.003");
	    usernameList.add("50.003");
	    usernameList.add("d50.003");
	    usernameList.add("td50.003");
	    usernameList.add("std50.003");
	    usernameList.add("istd50.003");
	    usernameList.add("cistd50.003");
	    usernameList.add("scistd50.003");
	    usernameList.add("JohnDoe@mymail.sutd.edu.sg");
	    
	    // Uses an iterator to iterate through available invalid usernames
		Iterator itr = usernameList.iterator();
		// Path to gecko webdriver
	    String path_to_gecko = "C:\\Users\\Jose Johnson\\selenium-java-3.141.59\\geckodriver.exe";

		System.setProperty("webdriver.gecko.driver", path_to_gecko);
		WebDriver driver = new FirefoxDriver();
		
		// Gets the website 
		driver.get("http://localhost:3000");
		driver.manage().window().maximize();
		
		Thread.sleep(7000);
		
		// Finds the respective webelements
		WebElement username = driver.findElement(By.className("username"));
		WebElement password = driver.findElement(By.className("password"));
		WebElement submit = driver.findElement(By.className("grow"));
		try {
			// Block will execute when log in is successful
			WebDriverWait wait = new WebDriverWait(driver, 10);
			wait.until(ExpectedConditions.elementToBeClickable(By.className("logout br2 shadow grow")));
			System.out.println("Logged in succesfully!");
		} catch (Exception NoSuchElementException) {
			// Block will execute when log in is failure
			System.out.println("Logged in failed, trying again");

			// Password is static for simplicity
			password.sendKeys(myPassword);
			System.out.println("Password keyed in");
			while(itr.hasNext()) {
		    	for(int i = 0; i <= usernameList.size(); i++) {
		    		driver.navigate().refresh();
		    		username = driver.findElement(By.className("username"));
		    		password = driver.findElement(By.className("password"));
		    		username.clear();
		    		password.clear();
		    		username.sendKeys(itr.next().toString());
		    		password.sendKeys(myPassword);
		    		submit = driver.findElement(By.className("grow"));
		    		submit.click();
		    		Thread.sleep(1000);
		    	}
		    }
			driver.navigate().refresh();
		}		
	}
}
