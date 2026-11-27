import Capacitor
import UIKit

final class GameViewController: CAPBridgeViewController {
    override func capacitorDidLoad() {
        if #available(iOS 26.0, *) {
            bridge?.registerPluginInstance(GameTabBarPlugin())
        }
    }
}

@available(iOS 26.0, *)
@objc(GameTabBarPlugin)
final class GameTabBarPlugin: CAPPlugin, CAPBridgedPlugin {
    let identifier = "GameTabBarPlugin"
    let jsName = "DustgameTabBar"
    let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "update", returnType: CAPPluginReturnPromise),
    ]

    private var tabBar: GameTabBar?

    @objc func update(_ call: CAPPluginCall) {
        let selection = call.getString("selected")
        let visible = call.getBool("visible", false)
        let titles = call.getArray("titles", String.self) ?? []
        let reduceMotion = call.getBool("reduceMotion", false)
        DispatchQueue.main.async { [self] in
            guard let host = self.bridge?.viewController?.view, titles.count == GameTabBar.pages.count else {
                call.reject("The game tab bar could not be configured.")
                return
            }

            if self.tabBar == nil {
                let bar = GameTabBar { [weak self] page in
                    self?.notifyListeners("select", data: ["page": page])
                }
                bar.attach(to: host)
                self.tabBar = bar
            }

            self.tabBar?.update(selection: selection, visible: visible, titles: titles, reduceMotion: reduceMotion)
            call.resolve()
        }
    }
}

@available(iOS 26.0, *)
private final class GameTabBar: UIVisualEffectView {
    static let pages = ["room", "collection", "storage", "shop"]

    private let buttons: [GameTabButton]
    private let highlight = UIVisualEffectView()
    private weak var selectedButton: GameTabButton?
    private weak var hoveredButton: GameTabButton?
    private var reduceMotion = false

    init(onSelect: @escaping (String) -> Void) {
        buttons = Self.pages.map { page in
            GameTabButton(configuration: .plain(), primaryAction: UIAction { _ in onSelect(page) })
        }
        let glass = UIGlassEffect()
        glass.isInteractive = true
        super.init(effect: glass)
        cornerConfiguration = .capsule()
        overrideUserInterfaceStyle = .dark

        let highlightGlass = UIGlassEffect(style: .clear)
        highlightGlass.tintColor = UIColor(red: 0.64, green: 0.78, blue: 1, alpha: 0.20)
        highlight.effect = highlightGlass
        highlight.cornerConfiguration = .capsule()
        highlight.isUserInteractionEnabled = false
        highlight.isHidden = true
        contentView.addSubview(highlight)

        let row = UIStackView(arrangedSubviews: buttons)
        row.distribution = .fillEqually
        row.spacing = 3
        row.translatesAutoresizingMaskIntoConstraints = false
        contentView.addSubview(row)
        NSLayoutConstraint.activate([
            row.topAnchor.constraint(equalTo: contentView.topAnchor, constant: 4),
            row.bottomAnchor.constraint(equalTo: contentView.bottomAnchor, constant: -4),
            row.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 4),
            row.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -4),
        ])
        row.addGestureRecognizer(UIHoverGestureRecognizer(target: self, action: #selector(hoverChanged(_:))))
        for button in buttons {
            button.highlightChanged = { [weak self] in self?.positionHighlight(animated: true) }
        }
    }

    required init?(coder: NSCoder) {
        fatalError("GameTabBar requires an onSelect handler")
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        positionHighlight(animated: false)
    }

    func attach(to host: UIView) {
        isHidden = true
        translatesAutoresizingMaskIntoConstraints = false
        host.addSubview(self)
        let safeArea = host.safeAreaLayoutGuide
        let preferredWidth = widthAnchor.constraint(equalToConstant: 384)
        preferredWidth.priority = .defaultHigh
        NSLayoutConstraint.activate([
            preferredWidth,
            widthAnchor.constraint(lessThanOrEqualTo: safeArea.widthAnchor, constant: -24),
            centerXAnchor.constraint(equalTo: safeArea.centerXAnchor),
            bottomAnchor.constraint(equalTo: safeArea.bottomAnchor, constant: -8),
            heightAnchor.constraint(equalToConstant: 56),
        ])
    }

    func update(selection: String?, visible: Bool, titles: [String], reduceMotion: Bool) {
        let wasVisible = !isHidden
        isHidden = !visible
        self.reduceMotion = reduceMotion
        if !visible { hoveredButton = nil }
        selectedButton = nil
        for (index, button) in buttons.enumerated() {
            let page = Self.pages[index]
            let selected = page == selection
            var configuration = UIButton.Configuration.plain()
            configuration.image = UIImage(named: "GameTab-\(page)")
            configuration.contentInsets = .zero
            configuration.cornerStyle = .capsule
            configuration.baseForegroundColor = selected ? UIColor(red: 0.66, green: 0.81, blue: 1, alpha: 1) : .label
            button.configuration = configuration
            button.accessibilityLabel = titles[index]
            button.accessibilityIdentifier = "game-tab-\(page)"
            if selected {
                selectedButton = button
                button.accessibilityTraits.insert(.selected)
            } else {
                button.accessibilityTraits.remove(.selected)
            }
        }
        positionHighlight(animated: wasVisible)
    }

    @objc private func hoverChanged(_ gesture: UIHoverGestureRecognizer) {
        switch gesture.state {
        case .began, .changed:
            hoveredButton = buttons.first { $0.bounds.contains(gesture.location(in: $0)) }
        default:
            hoveredButton = nil
        }
        positionHighlight(animated: true)
    }

    private func positionHighlight(animated: Bool) {
        let pressedButton = buttons.first(where: \.isHighlighted)
        guard !isHidden, let button = pressedButton ?? hoveredButton ?? selectedButton, !button.bounds.isEmpty else {
            highlight.isHidden = true
            return
        }

        let allowMotion = !reduceMotion && !UIAccessibility.isReduceMotionEnabled
        let inset: CGFloat = allowMotion && pressedButton != nil ? -2 : 1
        let frame = contentView.convert(button.bounds, from: button).insetBy(dx: inset, dy: inset)
        let wasVisible = !highlight.isHidden
        highlight.isHidden = false
        guard frame != highlight.frame else { return }

        if animated && wasVisible && allowMotion {
            UIView.animate(
                withDuration: 0.28,
                delay: 0,
                usingSpringWithDamping: 0.8,
                initialSpringVelocity: 0,
                options: [.beginFromCurrentState, .allowUserInteraction]
            ) {
                self.highlight.frame = frame
            }
        } else {
            highlight.frame = frame
        }
    }
}

@available(iOS 26.0, *)
private final class GameTabButton: UIButton {
    var highlightChanged: (() -> Void)?

    override var isHighlighted: Bool {
        didSet {
            if oldValue != isHighlighted { highlightChanged?() }
        }
    }
}
