'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
/*
// Encounter of the drawback of querySelector()
  The querySelector selects only the first query which have the same name as that of the selector and not all the selector with that name
*/
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

const openModal = function () {
  /*
    // the only drawback of using the style one is that, suppose here you have 10 more style which u have to remove then you have to manually remove them one by one and also have to remember their extact same property name. 
    
  overlay.style.display = 'block';
  modal.style.display = 'block';
  
   or;*/

  modal.classList.remove('hidden');
  // modal.classList.remove('hidden', "anotherClass"); -> we can remove multiple classes

  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal); // -> Here, we are not writing this overlay.addEventListener('click', closeModal()); as it will immediately call the function as soon as this line is executed. We want to call the closeModal function when the event occur.

/*
Now, keyboard events are so-called global events
because they do not happen on one specific element.
And for global events like keyboard events
we usually listen on the whole document.
So,
that's the same document that we use for query selector.
And so basically it's a big object which contains a bunch
of methods for all kind of stuffs.
And that includes the add event listener method.
So by using add a event listener here on the document
we are basically listening for events everywhere.
So no matter where they happen on the page,
they will always trigger the event handler
that we're going to specify here.

There are actually three types of events for the keyboard.

This are the "keydown", the "keypress" and the "keyup".

key up, which only happens when we lift our finger off the keyboard basically, Or off the key.

"Keypress" is fired continuously
as we keep our finger on a certain key

and "keydown" is fired as soon as we just press down the key. It is occur when any key is pressed and passing it as argument we can actually get which key is pressed, which is automatically done by the JS.

The information about which key was pressed will be stored in the event that is going to occur as soon
as any key is pressed.
So remember, as We hit any key here on the keyboard,
a key down event is generated
and our listener function that i.e.,
our handler function is waiting for that event to happen.
And anytime that an event like this occurs
JavaScript does in fact generate an object.
And that object contains all the information
about the event itself,
and we can then actually access that
object in the event handler function.
 */
document.addEventListener('keydown', function (e) {
  // console.log(e.key); // e = event. So as the event occurs the JS, will call the function with the event object as an argument. So here actually what happens is that when JS call function when a key down event happens, when it do so it will pass in the event object as an argument. Here key -> is a property what have the information which keyboard key was pressed.

  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    // -> contains() checks the class is present or not.
    closeModal(); // -> Here we have to call the function because when this addEventListener() method is executing and it then reaches this line of course, something needs to happen. What is need to happen is that what is written in the definition and it need to be called or we can copy the lines here.
  }
});
