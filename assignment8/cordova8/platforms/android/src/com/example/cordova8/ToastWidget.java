package com.example.cordova8;

import org.apache.cordova.CordovaActivity;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

public class ToastWidget {

	private CordovaActivity context;

	public ToastWidget(CordovaActivity webView) {
		context = webView;
	}

	@JavascriptInterface
	public void showShortToast(String message) {
		Toast.makeText(context, message, Toast.LENGTH_SHORT).show();
	}
	
	@JavascriptInterface
	public void showLongToast(String message) {
		Toast.makeText(context, message, Toast.LENGTH_LONG).show();
	}

}
