---
layout: post
title: "ICommand and RelayCommand"
date: 2015-03-01 12:00:00 -0300
categories: code
tags:
  - c#
  - icommand
  - relaycommand
  - wpf
---
To bind a command of a button you need to bind a property that is an implementation of an ICommand.


An ICommand is composed by:


<!--more-->


```csharp
event EventHandler CanExecuteChanged;
bool CanExecute(object parameter);
void Execute(object parameter);
```



`CanExecuteChanged` is invoked when changes occur that can change whether or not the command can be executed.


`CanExecute` will determine whether the command can be executed or not. If it returns false the button will be disabled on the interface.


`Execute` runs the command logic.


With a simple implementation of `ICommand` I can create for example:



```csharp
public class NormalCommand : ICommand
{
    public event EventHandler CanExecuteChanged;

    public bool CanExecute(object parameter)
    {
        throw new NotImplementedException();
    }

    public void Execute(object parameter)
    {
        throw new NotImplementedException();
    }
}
```

However this does not allow me to have a different logic to my `CanExecute` or `Execute`. For each command I would have to implement a new class. To solve that problem there is the `RelayCommand` implementation, which is a command that can be instantiated passing the actions to be executed:



```csharp
public class RelayCommand : ICommand
{
    private Action<object> execute;
    private Func<object, bool> canExecute;

    public event EventHandler CanExecuteChanged
    {
        add { CommandManager.RequerySuggested += value; }
        remove { CommandManager.RequerySuggested -= value; }
    }

    public RelayCommand(Action<object> execute, Func<object, bool> canExecute = null)
    {
        this.execute = execute;
        this.canExecute = canExecute;
    }

    public bool CanExecute(object parameter)
    {
        return this.canExecute == null || this.canExecute(parameter);
    }

    public void Execute(object parameter)
    {
        this.execute(parameter);
    }
}
```



With this implementation I can specify what I want to execute when I create the command, so I dont have to implement a new class for each different action I want to take. Then I can call it using:

```csharp
var cmd1 = new RelayCommand(o => { /* do something 1 */ }, o => true);
var cmd2 = new RelayCommand(o => { /* do something 2 */ }, o => true);
```

The `CommandManager.RequerySuggested` handles events when something in the interface suggests that a requery should happen. If your ICommand adds the handlers to it then it will automatically update UI elements when the screen execute some actions. (e.g. lose focus on a TextBox)
&nbsp;


