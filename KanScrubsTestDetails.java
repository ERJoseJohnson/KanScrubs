package newpackage;

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
	static String myPassword = "SUTD@Singapore";
	static ArrayList<String> usernameList = new ArrayList<String>();
	public static void main(String[] args) throws InterruptedException {
		
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
	    usernameList.add("escistd50.003");
	    
	    
	    Iterator itr = usernameList.iterator();
	    

		System.setProperty("webdriver.gecko.driver", "C:\\selenium-java-3.141.59\\geckodriver.exe");
		WebDriver driver = new FirefoxDriver();
		
		driver.get("http://192.168.1.86:3000");
		driver.manage().window().maximize();
		
		Thread.sleep(7000);
		

		WebElement username = driver.findElement(By.className("username"));
		WebElement password = driver.findElement(By.className("password"));
		WebElement submit = driver.findElement(By.className("grow"));
		try {
			WebDriverWait wait = new WebDriverWait(driver, 10);
			wait.until(ExpectedConditions.elementToBeClickable(By.className("logout br2 shadow grow")));
			System.out.println("Logged in succesfully!");
		} catch (Exception NoSuchElementException) {
			System.out.println("Logged in failed, trying again");

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