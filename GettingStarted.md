# Red Hat Developer Hub 

## Getting Started

For a visual guide, you can watch this video on [Getting started with the Red Hat Developer Hub](https://www.youtube.com/watch?v=tvVOC0mFR_4) .

The Software Templates are available under /create. 

Once there, you should see something that looks similar to this:

![Create](./assets/Create.png)
<br> </br>
## Choose a template

When you select a template that you want to create, you'll be taken to the next page which may or may not look different for each template. Each template can ask for different input variables, and they are then passed to the templater internally.

![Create](./assets/Create-2.png)
<br> </br>
## Run!

Once you've entered values and confirmed, you'll then get a page with live progress of what is currently happening with the creation of your template. It shouldn't take too long, and you'll have a success screen!

![Create](./assets/Create-3.png)
<br> </br>
If it fails, you'll be able to click on each section to get the log from the step that failed which can be helpful in debugging.

You can also cancel the running process. Once you clicked on button "Cancel", the abort signal will be sent to a task and all next steps won't be executed. The current step will be cancelled only if it supports it.

![Create](./assets/Create-4.png)

<br> </br>
## View Component in Catalog
When it's been created, you'll see the View in Catalog button, which will take you to the registered component in the catalog:

![Create](./assets/view.png) 
<br> </br>
And then you'll also be able to see it in the Catalog View table:

![Create](./assets/catalog.png) 

<br> </br>
## Previewing and Executing Previous Template Tasks

Each execution of a template is treated as a unique task, identifiable by its own unique ID. To view a list of previously executed template tasks, navigate to the "Create" page and access the "Task List" from the context menu (represented by the vertical ellipsis, or 'kebab menu', icon in the upper right corner).

![Create](./assets/TaskList.png) 
<br> </br>
If you wish to re-run a previously executed template, navigate to the template tasks page. Locate the desired task and select the "Start Over" option from the context menu.

![Create](./assets/startOver.png) 
<br> </br>
This action will initiate a new execution of the selected template, pre-populated with the same parameters as the previous run, but these parameters can be edited before re-execution.

In the event of a failed template execution, the "Start Over" option can be used to re-execute the template. The parameters from the original run will be pre-filled, but they can be adjusted as needed before retrying the template.
