package com.antimatterdimensions.endgame;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.MotionEvent;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebChromeClient;
import android.webkit.ValueCallback;
import android.widget.Button;
import android.widget.FrameLayout;
import androidx.appcompat.app.AppCompatActivity;
import java.util.ArrayList;
import java.util.List;
import android.content.SharedPreferences;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.SeekBar;
import android.widget.TextView;
public class MainActivity extends AppCompatActivity {
    public class MainActivity extends AppCompatActivity {
    private WebView webView;
    private SharedPreferences prefs;
    private static final String PREF_NAME = "game_settings";
    private static final String KEY_ZOOM = "zoom_level";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // ... 你的 WebView 初始化代码 ...

        prefs = getSharedPreferences(PREF_NAME, MODE_PRIVATE);
        int savedZoom = prefs.getInt(KEY_ZOOM, -1);

        if (savedZoom == -1) {
            // 首次打开 → 显示缩放校准
            showZoomCalibration();
        } else {
            // 直接应用已保存的缩放
            webView.setInitialScale(savedZoom);
        }
    }

    private void showZoomCalibration() {
        // 创建半透明遮罩
        FrameLayout overlay = new FrameLayout(this);
        overlay.setBackgroundColor(0xCC000000);
        overlay.setLayoutParams(new FrameLayout.LayoutParams(
            FrameLayout.LayoutParams.MATCH_PARENT,
            FrameLayout.LayoutParams.MATCH_PARENT
        ));

        // 主卡片
        LinearLayout card = new LinearLayout(this);
        card.setOrientation(LinearLayout.VERTICAL);
        card.setGravity(Gravity.CENTER);
        card.setPadding(40, 40, 40, 40);
        card.setBackgroundColor(0xFF1A1A2E);
        card.setElevation(20);

        FrameLayout.LayoutParams cardParams = new FrameLayout.LayoutParams(
            FrameLayout.LayoutParams.MATCH_PARENT,
            FrameLayout.LayoutParams.WRAP_CONTENT
        );
        cardParams.setMargins(40, 80, 40, 80);
        cardParams.gravity = Gravity.CENTER;
        card.setLayoutParams(cardParams);

        // 标题
        TextView title = new TextView(this);
        title.setText("🔍 缩放校准");
        title.setTextSize(24);
        title.setTextColor(0xFFFFFFFF);
        title.setGravity(Gravity.CENTER);
        card.addView(title);

        // 副标题
        TextView subtitle = new TextView(this);
        subtitle.setText("调整到你觉得舒适的大小");
        subtitle.setTextSize(16);
        subtitle.setTextColor(0xCCCCCCCC);
        subtitle.setGravity(Gravity.CENTER);
        subtitle.setPadding(0, 10, 0, 30);
        card.addView(subtitle);

        // 预览文本（模拟缩放效果）
        TextView preview = new TextView(this);
        preview.setText("📐 游戏界面预览");
        preview.setTextSize(20);
        preview.setTextColor(0xFFFFFFFF);
        preview.setGravity(Gravity.CENTER);
        preview.setBackgroundColor(0xFF2A2A4A);
        preview.setPadding(30, 60, 30, 60);
        preview.setLayoutParams(new LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.MATCH_PARENT,
            200
        ));
        card.addView(preview);

        // 滑块
        SeekBar seekBar = new SeekBar(this);
        seekBar.setMax(170);
        seekBar.setProgress(20); // 默认 50%
        seekBar.setLayoutParams(new LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.MATCH_PARENT,
            LinearLayout.LayoutParams.WRAP_CONTENT
        ));
        card.addView(seekBar);

        // 显示当前缩放值
        TextView zoomLabel = new TextView(this);
        zoomLabel.setText("50%");
        zoomLabel.setTextSize(18);
        zoomLabel.setTextColor(0xFFFFFFFF);
        zoomLabel.setGravity(Gravity.CENTER);
        zoomLabel.setPadding(0, 10, 0, 10);
        card.addView(zoomLabel);

        // 滑块监听
        seekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar bar, int progress, boolean fromUser) {
                int percent = 30 + progress;
                zoomLabel.setText(percent + "%");
                preview.setTextSize(percent / 100f * 20);
                // 预览容器缩放（用 setScaleX/Y 模拟）
                preview.setScaleX(percent / 100f);
                preview.setScaleY(percent / 100f);
            }
            @Override
            public void onStartTrackingTouch(SeekBar bar) {}
            @Override
            public void onStopTrackingTouch(SeekBar bar) {}
        });

        // 确认按钮
        Button confirmBtn = new Button(this);
        confirmBtn.setText("✅ 确认，开始游戏");
        confirmBtn.setTextSize(18);
        confirmBtn.setTextColor(0xFFFFFFFF);
        confirmBtn.setBackgroundColor(0xFFD4AF37);
        confirmBtn.setPadding(30, 20, 30, 20);
        confirmBtn.setLayoutParams(new LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.MATCH_PARENT,
            LinearLayout.LayoutParams.WRAP_CONTENT
        ));
        card.addView(confirmBtn);

        // 确认点击
        confirmBtn.setOnClickListener(v -> {
            int percent = 30 + seekBar.getProgress();
            prefs.edit().putInt(KEY_ZOOM, percent).apply();
            webView.setInitialScale(percent);
            // 移除遮罩
            ViewGroup parent = (ViewGroup) overlay.getParent();
            if (parent != null) parent.removeView(overlay);
        });

        // 把卡片加到遮罩上
        overlay.addView(card);
        addContentView(overlay, new FrameLayout.LayoutParams(
            FrameLayout.LayoutParams.MATCH_PARENT,
            FrameLayout.LayoutParams.MATCH_PARENT
        ));
    }
    }
    private ValueCallback<Uri[]> filePathCallback;
    private static final int FILE_CHOOSER_REQUEST_CODE = 1;

    // ===== 悬浮按钮系统 =====
    private FrameLayout floatingContainer;
    private final Handler longPressHandler = new Handler();
    private View currentWhiteOverlay = null;
    private FloatingButton currentlyPressedButton = null;  // 当前正在长按的按钮（保证同时只能卡一个键）

    // ===== 按钮配置列表 =====
    private final List<FloatingButton> buttons = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // ... 你的 WebView 初始化代码保持不变 ...
        getWindow().setStatusBarColor(android.graphics.Color.TRANSPARENT);
        getWindow().getDecorView().setSystemUiVisibility(
            View.SYSTEM_UI_FLAG_LAYOUT_STABLE
            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
        );

        WebView webView = findViewById(R.id.webView);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setUseWideViewPort(true);
        webView.getSettings().setLoadWithOverviewMode(false);
        webView.getSettings().setDomStorageEnabled(true);
        webView.getSettings().setAllowFileAccessFromFileURLs(true);
        webView.getSettings().setAllowUniversalAccessFromFileURLs(true);
        webView.getSettings().setSupportZoom(false);
        webView.getSettings().setBuiltInZoomControls(false);
        webView.setInitialScale(50);

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                startActivity(intent);
                return true;
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                view.loadUrl("javascript:(function() {" +
                    "var meta = document.createElement('meta');" +
                    "meta.name = 'viewport';" +
                    "meta.content = 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=no';" +
                    "var oldMeta = document.querySelector('meta[name=viewport]');" +
                    "if (oldMeta) oldMeta.parentNode.removeChild(oldMeta);" +
                    "document.head.appendChild(meta);" +
                "})()");
            }
        });

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onShowFileChooser(
                    WebView webView,
                    ValueCallback<Uri[]> filePathCallback,
                    FileChooserParams fileChooserParams) {
                MainActivity.this.filePathCallback = filePathCallback;
                Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
                intent.setType("*/*");
                startActivityForResult(intent, FILE_CHOOSER_REQUEST_CODE);
                return true;
            }
        });

        webView.loadUrl("file:///android_asset/public/index.html");

        // ===== 初始化悬浮按钮系统 =====
        initFloatingContainer();
        registerButtons();
        renderButtons();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == FILE_CHOOSER_REQUEST_CODE) {
            if (filePathCallback != null) {
                Uri[] results = null;
                if (resultCode == Activity.RESULT_OK && data != null) {
                    if (data.getClipData() != null) {
                        int count = data.getClipData().getItemCount();
                        results = new Uri[count];
                        for (int i = 0; i < count; i++) {
                            results[i] = data.getClipData().getItemAt(i).getUri();
                        }
                    } else if (data.getData() != null) {
                        results = new Uri[]{data.getData()};
                    }
                }
                filePathCallback.onReceiveValue(results);
                filePathCallback = null;
            }
        }
    }

    // ============================================================
    //  模块化悬浮按钮系统
    // ============================================================

    private void initFloatingContainer() {
        floatingContainer = new FrameLayout(this);
        FrameLayout.LayoutParams containerParams = new FrameLayout.LayoutParams(
            FrameLayout.LayoutParams.MATCH_PARENT,
            FrameLayout.LayoutParams.MATCH_PARENT
        );
        addContentView(floatingContainer, containerParams);
    }

    /**
     * 在这里注册所有按钮
     * 格式：new FloatingButton("显示文本", KeyEvent.KEYCODE_XXX, 条件布尔值)
     */
    private void registerButtons() {
        // M 键：无条件显示
        buttons.add(new FloatingButton("切换", KeyEvent.KEYCODE_SHIFT_LEFT, true));
        buttons.add(new FloatingButton("最大", KeyEvent.KEYCODE_M, true));
        buttons.add(new FloatingButton("维度提升", KeyEvent.KEYCODE_D, true));
        buttons.add(new FloatingButton("反物质星系", KeyEvent.KEYCODE_G, true));
        buttons.add(new FloatingButton("大脆", KeyEvent.KEYCODE_C, "player.infinities.gte(1)"));
        buttons.add(new FloatingButton("复制器星系", KeyEvent.KEYCODE_R, "player.replicanti.unl"));
        buttons.add(new FloatingButton("永恒", KeyEvent.KEYCODE_E, "player.eternities.gte(1)"));

        // 示例：最大（假设 player.maxReached 为 true 时显示）
        // buttons.add(new FloatingButton("最大", KeyEvent.KEYCODE_0, player.maxReached));

        // 示例：自动（假设 player.autoUnlocked 为 true 时显示）
        // buttons.add(new FloatingButton("自动", KeyEvent.KEYCODE_A, player.autoUnlocked));

        // 你可以继续添加更多按钮...
    }

    private void renderButtons() {
        int index = 0;
        for (FloatingButton btnData : buttons) {
            // 条件判断：如果条件为 false，跳过渲染（不显示）
            if (!btnData.condition) continue;

            Button btn = createCircleButton(btnData.text);
            FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(120, 120);
            params.gravity = Gravity.BOTTOM | Gravity.END;
            params.bottomMargin = 180 + (index * 140);  // 每个按钮往上叠加 140dp
            params.rightMargin = 40;
            floatingContainer.addView(btn, params);

            // 绑定点击事件
            btn.setOnClickListener(v -> {
                sendKeyEvent(btnData.keyCode);
            });

            // 绑定长按事件（卡键）
            btn.setOnLongClickListener(v -> {
                startLongPress(btnData, v);
                return true;
            });

            // 监听松手，停止卡键
            btn.setOnTouchListener((v, event) -> {
                if (event.getAction() == MotionEvent.ACTION_UP) {
                    stopLongPress();
                }
                return false;
            });

            index++;
        }
    }

    // ----- 圆形按钮工厂 -----
    private Button createCircleButton(String text) {
        Button btn = new Button(this);
        btn.setText(text);
        btn.setTextSize(16);
        btn.setTextColor(0xFFFFFFFF);
        android.graphics.drawable.GradientDrawable bg = new android.graphics.drawable.GradientDrawable();
        bg.setShape(android.graphics.drawable.GradientDrawable.OVAL);
        bg.setColor(0xCC333333);
        btn.setBackground(bg);
        return btn;
    }

    // ----- 长按：白框 + 卡键（同时只能卡一个）-----
    private void startLongPress(FloatingButton btnData, View anchor) {
        // 如果已经有按钮在卡键，先释放它
        if (currentlyPressedButton != null) {
            stopLongPress();
        }

        currentlyPressedButton = btnData;
        showWhiteOverlay(anchor);

        // 持续发送按键事件
        Runnable runnable = new Runnable() {
            @Override
            public void run() {
                if (currentlyPressedButton != null) {
                    sendKeyEvent(btnData.keyCode);
                    longPressHandler.postDelayed(this, 100);
                }
            }
        };
        longPressHandler.post(runnable);
    }

    private void stopLongPress() {
        currentlyPressedButton = null;
        hideWhiteOverlay();
        longPressHandler.removeCallbacksAndMessages(null);
    }

    // ----- 白框效果（只显示一个）-----
    private void showWhiteOverlay(View anchor) {
        hideWhiteOverlay();  // 移除旧白框
        currentWhiteOverlay = new View(this);
        currentWhiteOverlay.setBackgroundColor(0x66FFFFFF);
        FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(
            anchor.getWidth() + 40,
            anchor.getHeight() + 40
        );
        params.gravity = Gravity.BOTTOM | Gravity.END;
        params.bottomMargin = getMarginBottom(anchor) - 10;
        params.rightMargin = 30;
        floatingContainer.addView(currentWhiteOverlay, params);
        currentWhiteOverlay.setVisibility(View.VISIBLE);
    }

    private void hideWhiteOverlay() {
        if (currentWhiteOverlay != null) {
            floatingContainer.removeView(currentWhiteOverlay);
            currentWhiteOverlay = null;
        }
    }

    // 辅助方法：获取按钮的 bottomMargin
    private int getMarginBottom(View anchor) {
        FrameLayout.LayoutParams params = (FrameLayout.LayoutParams) anchor.getLayoutParams();
        return params.bottomMargin;
    }

    // ----- 发送键盘事件到 WebView -----
    private void sendKeyEvent(int keyCode) {
        WebView webView = findViewById(R.id.webView);
        if (webView == null) return;
        KeyEvent downEvent = new KeyEvent(KeyEvent.ACTION_DOWN, keyCode);
        KeyEvent upEvent = new KeyEvent(KeyEvent.ACTION_UP, keyCode);
        webView.dispatchKeyEvent(downEvent);
        webView.dispatchKeyEvent(upEvent);
    }

    // ============================================================
    //  按钮数据模型
    // ============================================================

    private static class FloatingButton {
        String text;
        int keyCode;
        boolean condition;

        FloatingButton(String text, int keyCode, boolean condition) {
            this.text = text;
            this.keyCode = keyCode;
            this.condition = condition;
        }
    }
}