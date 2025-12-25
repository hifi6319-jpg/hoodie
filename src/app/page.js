import Background from '../components/Background'
import Scene from '../components/canvas/Scene'
import Navbar from '../components/Navbar'
import HeroContent from '../components/HeroContent'
import Controls from '../components/Controls'
import FooterData from '../components/FooterData'

export default function Home() {
    return (
        <main className="app-container" style={{ position: 'relative', minHeight: '200vh' }}>
            <Background />
            <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden' }}>
                <Scene />
                <Navbar />
                <HeroContent />
                <Controls />
                <FooterData />
            </div>

            {/* Scroll Spacer */}
            <div style={{ height: '100vh', pointerEvents: 'none' }}></div>
        </main>
    );
}
