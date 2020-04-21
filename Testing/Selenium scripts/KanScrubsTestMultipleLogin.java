package frontendTesting;

import java.util.List;
import java.util.Random;

import org.openqa.selenium.By;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

public class KanScrubsTestMultipleLogin {
	static String myUserName = "JohnDoe@mymail.sutd.edu.sg";
	static String myPassword = "IAmJohnDoes1!";
	public static void main(String[] args) throws InterruptedException {
			
			System.setProperty("webdriver.gecko.driver", "C:\\Users\\Jose Johnson\\selenium-java-3.141.59\\geckodriver.exe");
			
			for (int i = 0; i < 5; i++) {
				
			WebDriver driver = new FirefoxDriver();
			
			driver.get("http://localhost:3000");
			driver.manage().window().maximize();
			Thread.sleep(7000);
			
			WebElement username = driver.findElement(By.className("username"));
			WebElement password = driver.findElement(By.className("password"));
			WebElement submit = driver.findElement(By.className("grow"));
			
			username.sendKeys(myUserName);
			password.sendKeys(myPassword);
			submit.click();
			
			}
			
		}
}
