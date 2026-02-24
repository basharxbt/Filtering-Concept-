Answers to the Question bellow;

1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Ans;

Difference Between getElementById and getElementbyClassname:

getElementById is used to select one element by its id.
Since an id should be unique in a webpage, it always returns only one element.

And

getElementsByClassName is used to select elements by their class name.
It can return multiple elements because many elements can share the same class. It returns a collection of elements. ;

<!--  -->

Difference Between querySelector and querySelectorAll:

querySelector is more flexible. It uses CSS selectors and returns the first element that matches the selector.

And

querySelectorAll also uses CSS selectors, but it returns all matching elements instead of just the first one.

<!--  -->

2. How do you create and insert a new element into the DOM

To create a new element in JavaScript, first we use document.createElement() and specify the type of element we want to create.
Then we insert it into the webpage using methods like appendChild() inside a parent element.

- So the basic process is:

- Create the element

- Add content or attributes

- Insert it into the DOM

<!--  -->

3. What is Event Bubbling? And how does it work?

Event Bubbling is a concept where an event starts from the target element and then moves upward to its parent elements.
For example, if a button is inside a div and we click the button, the click event will first happen on the button. After that,
it will also trigger the event on the parent div, and then continue moving upward.
So the event flows from child to parent. This upward movement is called bubbling.

<!--  -->

4. What is Event Delegation in JavaScript? Why is it useful?

Event Delegation is a technique where we add an event listener to a parent element instead of adding separate event listeners to each child element.
Because of event bubbling, the parent can detect which child element triggered the event.

It is useful because:
It reduces the number of event listeners, and It improves performance.
It works for dynamically added elements.
It keeps the code cleaner and easier to manage. Instead of adding many event listeners, we can handle everything from one parent element.

<!--  -->

5. Difference between preventDefault() and stopPropagation()

preventDefault() is used to stop the default action of an element.

And

stopPropagation() is used to stop the event from moving up to parent elements. It prevents event bubbling.
