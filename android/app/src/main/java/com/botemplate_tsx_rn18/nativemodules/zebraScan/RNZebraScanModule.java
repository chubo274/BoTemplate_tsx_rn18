package com.botemplate_tsx_rn18.nativemodules.zebraScan;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import android.util.Log;

public class RNZebraScanModule extends ReactContextBaseJavaModule {
    RNZebraScanModule(ReactApplicationContext context) {
        super(context);

    }

    @Override
    public String getName() {
        return "RNZebraScanModule";
    }

    @ReactMethod
    public void connectToScanner(String name) {
        Log.d("connectToScanner", "Create event called with name: " + name);
    }

    @ReactMethod
    public void gotoScan(){

    }
}
