import { expect, test } from '@playwright/test'

test('@basictests Working with webelements', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.getByText('Register Page').first().click();
    const fullname_textbox = page.getByPlaceholder("John Doe");
    await fullname_textbox.fill("RCV Academy");
    await fullname_textbox.clear();
    await fullname_textbox.fill("RCV Academy123", { force: true });
    await fullname_textbox.clear();
    await fullname_textbox.pressSequentially("Software Testing Mentor");
    await fullname_textbox.clear();
    await fullname_textbox.pressSequentially("Software Testing Mentor123", { delay: 100 });
})

test('@basictests Working with radio buttons', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.getByText('Register Page').first().click();
    const radio_button_female = page.getByLabel("Female");
    const radio_button_male = page.locator("#gender-male")
    await radio_button_female.check();
    expect(radio_button_female).toBeChecked();
    const isCheckedfemale = await radio_button_female.isChecked();
    expect(isCheckedfemale).toBeTruthy();
    await radio_button_male.setChecked({ force: true })
    expect(radio_button_male).toBeChecked();

})

test('@basictests Working with checkboxes', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.getByText('Register Page').first().click();
    const checkbox_tc = page.getByLabel("I agree to the Terms & Conditions");
    const checkbox_newsletter = page.getByLabel("Subscribe to newsletter");
    await checkbox_tc.check();
    expect(checkbox_tc).toBeChecked();
    await checkbox_newsletter.setChecked();
    const news_check = await checkbox_newsletter.isChecked();
    expect(news_check).toBeFalsy()

})

test('Working with select dropdown', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.getByText('Register Page').first().click();
    const country_dropdown = page.locator("#country");
    await country_dropdown.selectOption('ca');
    await country_dropdown.selectOption({ label: 'Australia' });
})

test('Mouse click', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.getByText('Dynamic Table').first().click();
    //  const addRow_btn = page.getByRole("button", {name: 'Add Row'});
    const addRow_btn = page.locator("#add-row-btn");
    await addRow_btn.dblclick();
    await addRow_btn.click();
    await addRow_btn.click({ button: "right" });
    await addRow_btn.click({ button: "middle" });
    //  await addRow_btn.click({modifiers: 'Shift'});
    //  await addRow_btn.click({modifiers: 'ControlOrMeta'});
    //  await addRow_btn.click({button: 'right', modifiers: 'Shift', position: {x:10, y:20} });

})

test('Keyboard operations', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.getByText('Dynamic Table').first().click();
    const addRow_btn = page.locator("#add-row-btn");
    await addRow_btn.click();
    await page.press('body', 'Tab');
    await page.press('body', 'Tab');
    await page.press('body', 'Enter');
    await page.getByText('Register Page').first().click();
    const full_name = page.locator('#full-name');
    const email = page.locator('#email');
    await full_name.fill("RCV Academy");
    await full_name.press('ControlOrMeta+A');
    await full_name.press('ControlOrMeta+C');
    await email.press('ControlOrMeta+V');

})

test('Mouse hover and focus operations', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.getByText('Mouse Hover').first().click();
    const dropdown = page.locator('#hover-dropdown-trigger');
    const hover_box = page.locator('#hover-box-1');
    await dropdown.hover({ force: true })
    await hover_box.focus();

})

test('Drag and Drop Operation Test', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.getByText('Drag and Drop').first().click();
    const item_to_drag = page.locator('#drag-item-1');
    const in_progress_column = page.locator('#col-inprogress');
    const in_progress_card = page.locator('#drag-item-4');
    const done_column = page.locator('#col-done');
    //Dragto Method
    await item_to_drag.dragTo(in_progress_column);
    //Manual Drag
    await in_progress_card.hover();
    await page.mouse.down();
    await done_column.hover();
    await page.mouse.up();
})

test('Handle scrolling', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.getByText('Scrollbars').first().click();
    const footer_course_link = page.locator('#footer-courses');
    const vertical_scroll_container = page.locator('#vertical-scroll-box');
    await footer_course_link.scrollIntoViewIfNeeded();
    await vertical_scroll_container.hover();
    await page.mouse.wheel(0, 100);
    await vertical_scroll_container.evaluate(e => e.scrollTop += 300);
})

test('Handling sliders', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.getByText('Horizontal Slider').first().click();
    const temp_slider = page.locator('#temp-slider');
    await temp_slider.scrollIntoViewIfNeeded();
    const bbox = await temp_slider.boundingBox();
    const x = bbox.x + bbox.width / 2;
    const y = bbox.y + bbox.height / 2;
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x + 50, y + 0);
    await page.mouse.up();
})

test('Handling iframes', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.getByText('IFrame').first().click();
    const first_iframe = page.frameLocator('#internal-iframe');
    await first_iframe.locator('#iframe-name-input').fill("RCV Academy");
    await page.locator('#header-home').click();
})

test('Handling JS Alerts', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.getByText('JS Alert').first().click();
    const alertbtn = page.locator('#trigger-alert-btn');
    await alertbtn.click();
    await page.getByText('JS Confirm').first().click();
    const confirmbtn = page.locator('#trigger-confirm-btn');

    page.once('dialog', async dialog => {
        console.log(dialog.message());
        await dialog.accept();

    })

    await confirmbtn.click();
    await page.getByText('JS Prompt').first().click();
    const prompt_btn = page.locator('#trigger-prompt-btn');
    page.once('dialog', async dialog => {
        console.log(dialog.message());
        await dialog.accept("RCV Academy");

    })
    await prompt_btn.click();

})

test('@basictests Handling Tooltips', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.getByText('Tooltips').first().click();

    //Tooltip with data-tooltip attribute
    const tooltip_css_only = page.locator('#tooltip-btn-1')
    await tooltip_css_only.hover();
    const tootip_text = await tooltip_css_only.getAttribute('data-tooltip');
    expect(tootip_text).toBe('This is a CSS tooltip on a button');

    //Accesible tooltip
    await page.getByRole('button', {name: 'Accessible Tooltip Button'}).hover();
    expect(page.getByRole('tooltip')).toContainText('ARIA tooltip — accessible to screen readers');
    

    //Native tooltip
    const native_tooltip = page.getByRole('button', {name: 'Native Tooltip Button'});
    await native_tooltip.hover();
    const toltip_value = await native_tooltip.getAttribute('title');
    expect(toltip_value).toBe('I am a native browser tooltip');

    //Hidden DOM tooltip
    const hiddenDomTooltipButton = page.getByRole('button', {name: 'Hover & Inspect DOM'});
    await hiddenDomTooltipButton.hover();
    const tooltip_text = await page.locator('#dom-tooltip-popup').textContent();
    expect(tooltip_text).toBe('This tooltip only exists in the DOM while hovering');

  })

test('Handling calender', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.getByText('Calendar').first().click();
    await page.locator('#native-date').fill('2026-02-19');
    // await page.locator('#jqui-datepicker').fill('03/25/2026')
  })

test("Handing web table", async({page}) => {
    await page.goto('http://localhost:3000');
    await page.getByText('Data Table').first().click();
    const rowdata = page.getByRole('row', {name: 'rohan@company.com'});
    await rowdata.getByRole('button', {name: 'Edit'}).click();
    await rowdata.locator('[data-field="role"]').fill('testing');
})

 