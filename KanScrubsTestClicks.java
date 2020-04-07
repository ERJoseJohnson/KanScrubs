package newpackage;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Random;

import org.openqa.selenium.By;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;



public class KanScrubsTestClicks {


	public static void main(String[] args) throws InterruptedException {
		
		System.setProperty("webdriver.gecko.driver", "C:\\selenium-java-3.141.59\\geckodriver.exe");
		WebDriver driver = new FirefoxDriver();
		
		driver.get("http://192.168.1.86:3000");
		driver.manage().window().maximize();
		
		Thread.sleep(7000);

		List<WebElement> links = driver.findElements(By.tagName("a"));
		
		while(true) {
			boolean stale = true;
			Random r = new Random();
			int next = r.nextInt(links.size());
			if (links.get(next).getAttribute("href") == null)
				continue;
			while(stale) {
				try {
					driver.navigate().to(links.get(next).getAttribute("href"));
					Thread.sleep(5000);
					driver.navigate().back();
					links = driver.findElements(By.tagName("a"));
					stale = false;
				}
				catch (StaleElementReferenceException e) {
					stale = true;
				}
			}
			
			driver.navigate().refresh();
		}
	}
}

