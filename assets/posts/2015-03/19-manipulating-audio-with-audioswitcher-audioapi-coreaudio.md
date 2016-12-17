---
layout: post
title: "Manipulating audio with AudioSwitcher.AudioApi.CoreAudio"
date: 2015-03-19 12:00:00 -0300
categories: code
tags:
  - audioswitcher-audioapi
  - c#
  - core-audio-api
---
The [AudioSwitcher.AudioApi.CoreAudio](https://www.nuget.org/packages/AudioSwitcher.AudioApi.CoreAudio/) nuget package allows you to easily manipulate audio devices.

```csharp
public CoreAudioController Controller { get; }
    = new CoreAudioController();

public CoreAudioDevice MicDevice
{
    get
    {
        return Controller
            .GetCaptureDevices(DeviceState.Active)
            .FirstOrDefault(o => o.IsDefaultDevice);
    }
}
```

Having the device I can call the `Mute` method. It requires a parameter to tell if the device should be muted or unmuted:

```csharp
MicDevice.Mute(true);  // mute
MicDevice.Mute(false); // unmute
```

For [more information on this API you can check their Github](https://github.com/xenolightning/AudioSwitcher).
