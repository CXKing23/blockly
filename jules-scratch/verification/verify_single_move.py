import asyncio
from playwright.async_api import async_playwright, expect
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Construct the full, absolute path to the HTML file
        html_file_path = os.path.abspath('custom-toolbox-codelab/starter-code/index.html')

        # Use a 'file://' URL to open the local file
        await page.goto(f'file://{html_file_path}')

        # Wait for the board to be visible
        await page.wait_for_selector('#board')

        # Directly call the game's JavaScript functions to simulate user code
        # This attempts to make two moves in one "turn"
        await page.evaluate("() => { placeX(1, 1); placeX(1, 2); }")

        # Wait for the computer's move to complete.
        # After the computer moves, the status text updates to "Your turn (X)".
        status_element = page.locator("#status")
        await expect(status_element).to_have_text("Your turn (X)", timeout=2000)

        # Take a screenshot to verify the board state
        await page.screenshot(path="jules-scratch/verification/verification.png")

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())