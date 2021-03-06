//
//  QRScannerViewController.swift
//  MusicMaker
//
//  Created by Vuk Radosavljevic on 12/2/18.
//  Copyright © 2018 Vuk. All rights reserved.
//

import UIKit
import AVFoundation
import FirebaseFirestore

class QRScannerViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        NotificationCenter.default.addObserver(self, selector: #selector(stopCaptureSession), name: .qrHidden, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(startCaptureSession), name: .qrShown, object: nil)
        qrView.setupCaptureSession()
        let captureMetadataOutput = AVCaptureMetadataOutput()
        qrView.captureSession?.addOutput(captureMetadataOutput)
        captureMetadataOutput.setMetadataObjectsDelegate(self, queue: DispatchQueue.main)
        captureMetadataOutput.metadataObjectTypes = captureMetadataOutput.availableMetadataObjectTypes
    }
    
    @objc func stopCaptureSession() {
        self.qrView.captureSession?.stopRunning()
    }
    
    @objc func startCaptureSession() {
        self.qrView.captureSession?.startRunning()
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        self.qrView.captureSession?.startRunning()
        qrCodeFeedbackLabel.isHidden = true
    }
    
    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
        NotificationCenter.default.removeObserver(self, name: .qrHidden, object: nil)
        NotificationCenter.default.removeObserver(self, name: .qrShown, object: nil)
        qrView.captureSession?.stopRunning()
    }
    
    override func viewWillLayoutSubviews() {
        switch UIApplication.shared.statusBarOrientation {
        case .portrait:
            qrView.videoPreviewLayer.connection?.videoOrientation = .portrait
        case .portraitUpsideDown:
            qrView.videoPreviewLayer.connection?.videoOrientation = .portraitUpsideDown
        case .landscapeLeft:
            qrView.videoPreviewLayer.connection?.videoOrientation = .landscapeLeft
        case .landscapeRight:
            qrView.videoPreviewLayer.connection?.videoOrientation = .landscapeRight
        default:
            break
        }
    }
    
    // MARK: - IBOutlets
    @IBOutlet weak var centerView: UIView! {
        didSet {
            centerView.layer.borderColor = UIColor.white.cgColor
            centerView.layer.borderWidth = 5.0
            centerView.layer.cornerRadius = 5.0
        }
    }
    @IBOutlet weak var qrView: QRView!
    
    @IBOutlet weak var qrCodeFeedbackLabel: UILabel!
    
    // MARK: - Properties
    private var player: AVAudioPlayer?

    
    // MARK: - Delegate
    weak var delegate: QRScanning?
    let database = Firestore.firestore()
}

protocol QRScanning: class {
    func qrCodeScanned(_ qrCode: String)
}

extension QRScannerViewController: AVCaptureMetadataOutputObjectsDelegate {
    func metadataOutput(_ output: AVCaptureMetadataOutput, didOutput metadataObjects: [AVMetadataObject], from connection: AVCaptureConnection) {
        
        if metadataObjects.count == 0 || metadataObjects.count > 1 {
            return
        }
    
        guard let metadataObject = metadataObjects[0] as? AVMetadataMachineReadableCodeObject else {return}
   
        if metadataObject.type == AVMetadataObject.ObjectType.qr {
            if let qrCodeString = metadataObject.stringValue {
                if !qrCodeString.contains("//") {
                    let teacherReference = database.collection("teachers").document(qrCodeString)
                    teacherReference.getDocument { (document, erro) in
                        if let document = document, document.exists {
                            self.playSound()
                            if let data = document.data(), let name = data["name"] as? [String: String], let firstName = name["firstName"], let lastName = name["lastName"]  {
                                self.qrCodeFeedbackLabel.text = "\(firstName) \(lastName)"
                                self.qrCodeFeedbackLabel.isHidden = false
                                self.qrView.captureSession?.stopRunning()
                                self.delegate?.qrCodeScanned(qrCodeString)
                            }
                        } else {
                            self.qrCodeFeedbackLabel.text = "Not a valid teacher"
                            self.qrCodeFeedbackLabel.isHidden = false
                        }
                    }
                } else {
                    qrCodeFeedbackLabel.text = "Not a valid teacher"
                    qrCodeFeedbackLabel.isHidden = false
                }
            }
        }

       
    }
    
    private func playSound() {
        guard let url = Bundle.main.url(forResource: "scannedSound", withExtension: "mp3") else {
            return
        }
        do {
            player = try AVAudioPlayer(contentsOf: url)
            player?.play()
        } catch let error as NSError {
            NSLog("\(error)")
        }
    }
}
