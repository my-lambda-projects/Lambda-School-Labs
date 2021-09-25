//
//  LandingPageViewController.swift
//  FireFlight
//
//  Created by Kobe McKee on 8/19/19.
//  Copyright © 2019 Lambda. All rights reserved.
//

import UIKit
import AVFoundation

class LandingPageViewController: UIViewController {    

    var apiController: APIController?
    let network: NetworkManager = NetworkManager.sharedInstance
    
    @IBOutlet weak var iconImageView: UIImageView!
    @IBOutlet weak var joinNowButton: UIButton!
    @IBOutlet weak var signInButton: UIButton!
    
    var player: AVPlayer!
    var playerLayer: AVPlayerLayer!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let appDelegate = UIApplication.shared.delegate as! AppDelegate
        self.apiController = appDelegate.apiController

        setupVideo()
        stylize()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(true)
        NetworkManager.isUnreachable { _ in
            self.showOfflineView()
        }
    }
    


    
    func setupVideo() {
        let videoURL = URL(fileURLWithPath: Bundle.main.path(forResource: "FireFlight-bounce", ofType: "mp4")!)
        
        player = AVQueuePlayer(url: videoURL)
        playerLayer = AVPlayerLayer(player: player)

        playerLayer.videoGravity = AVLayerVideoGravity.resizeAspectFill
        player.volume = 0
        player.actionAtItemEnd = AVPlayer.ActionAtItemEnd.none
        
        playerLayer.frame = view.layer.bounds
        view.backgroundColor = .clear
        view.layer.insertSublayer(playerLayer, at: 0)
        
        player.play()
        
        NotificationCenter.default.addObserver(forName: NSNotification.Name.AVPlayerItemDidPlayToEndTime,
                                               object: self.player.currentItem,
                                               queue: .main) { _ in
                                                self.player.seek(to: CMTime.zero)
                                                self.player.play()
        }
        
    }
    
    func stylize() {
        joinNowButton.layer.cornerRadius = 10
        joinNowButton.backgroundColor = .white
        
        joinNowButton.setTitleColor(AppearanceHelper.ming, for: .normal)
        iconImageView.image = UIImage(named: "FFLogo2")
    }
    
    
    func showOfflineView() {
        performSegue(withIdentifier: "NetworkUnavailable", sender: self)
    }
    
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "LandingToSignUp" {
            guard let destinationVC = segue.destination as? SignUpViewController else { return }
            destinationVC.apiController = apiController
            
        } else if segue.identifier == "LandingToLogIn" {
            guard let destinationVC = segue.destination as? LogInViewController else { return }
            destinationVC.apiController = apiController
        }
    }
}
